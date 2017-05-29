'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var chalk = require('chalk')
var db = require('../../../db');
var Transaction = db.model('transaction')
var User = db.model('user')
var multer = require('multer')
var azure = require('azure-storage');
var blobSvc = azure.createBlobService('DefaultEndpointsProtocol=https;AccountName=edvances;AccountKey=E69FNxbG0QQF+rLoFRRYulGDKWOYMmfUn1WmNtf9uznDauN0yksEgFFZot+sYPcjEGoHSRl2ccPj8R8JAPaHYA==;EndpointSuffix=core.windows.net')
var storage = multer.memoryStorage();
var streamifier = require('streamifier');
var upload = multer({
    storage: storage
})


var paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AXHqgix21a6wIwAdA6pjHVPu8Uk2qMczHJSDzAaf1u6RHKRecO-jsmM9ylhpzwBkxpQyA3frJOPuqBFc',
    'client_secret': 'EGcLrMqnndLZuT8pdpv0_aBVigffRDNrPJdmMrBfbHhGOyMIV--8rGXNy_4kpxmFY2K1EMWn3IAiDgi7'
})
var ensureAuthenticated = function(req, res, next) {
    var err;
    if (req.isAuthenticated()) {
        next();
    } else {
        err = new Error('You must be logged in.');
        err.status = 401;
        next(err);
    }
};

router.get('/teacher/:id', ensureAuthenticated, (req, res) => {
    console.log('hello')
    db.query(`select t.*, c.title, u.id as teacher_id from transactions t 
left join classrooms c on c.id = t.classroom
left join users u on u.id = c.teacher
where owner = ${req.params.id} or u.id = ${req.params.id}`).then(transactions => {
        console.log('i finished')
        res.json(transactions)
    })
})

router.get('/create/:id', ensureAuthenticated, (req, res) => {
    var method = req.query.method;
    var amount = JSON.parse(req.query.amount)
    var payment = {
        "intent": "sale",
        "payer": {},
        "transactions": [{
            "amount": {
                "currency": amount.currency,
                "total": amount.total
            },
            "description": req.query.description
        }]
    }
    if (method === 'paypal') {
        payment.payer.payment_method = 'paypal';
        payment.redirect_urls = {
            "return_url": "http://yoururl.com/execute",
            "cancel_url": "http://yoururl.com/cancel"
        };
    } else if (method === 'credit_card') {
        var ccInfo = JSON.parse(req.query.ccInfo)
        var funding_instruments = [{
            "credit_card": {
                "type": ccInfo.type.toLowerCase(),
                "number": ccInfo.number,
                "expire_month": ccInfo.expire_month,
                "expire_year": ccInfo.expire_year,
                "first_name": ccInfo.first_name,
                "last_name": ccInfo.last_name,
                "billing_address": ccInfo.billing_address
            }
        }];
        payment.payer.payment_method = 'credit_card';
        payment.payer.funding_instruments = funding_instruments;

    }
    paypal.payment.create(payment, function(error, payment) {
        if (error) {
            res.json({
                status: 400,
                error: error
            });
        } else {
            User.findOne({
                where: {
                    id: req.params.id
                }
            }).then(user => {
                Transaction.create({
                    owner: user.id,
                    type: 'purchase',
                    amount: req.query.credits,
                    description: req.query.description
                }).then(transaction => {
                    user.credits = user.credits + Number(req.query.credits)
                    return user.save()
                }).then(user => {
                    res.json({
                        status: 200,
                        data: user
                    })
                })
            })
        }
    });
})

router.post('/payout/:id', ensureAuthenticated, (req, res) => {
    //this is going to be the route that teachers get paid
    var sender_batch_id = Math.random().toString(36).substring(9);
    console.log(req.body)
    var create_payout_json = {
        "sender_batch_header": {
            "sender_batch_id": sender_batch_id,
            "email_subject": "You have a payment"
        },
        "items": [{
            "recipient_type": "EMAIL",
            "amount": {
                "value": req.body.amount,
                "currency": "USD"
            },
            "receiver": req.body.email,
            "sender_item_id": "item_3"
        }]
    };

    var sync_mode = 'true';

    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        console.log(user)
        if (user.role !== 1) res.json({
            status: 300,
            message: 'Unauthorized'
        })
        if (user.balance < req.body.amount) res.json({
            status: 300,
            message: 'Insufficient Funds'
        })
        paypal.payout.create(create_payout_json, sync_mode, function(error, payout) {
            if (error) {
                console.log(JSON.stringify(error))
                res.json(error)
            } else {
                console.log(payout)
                Transaction.create({
                    owner: user.id,
                    type: 'payout',
                    amount: req.body.amount,
                    currency: req.body.currency,
                    description: `${Date.now()} ${sender_batch_id} payout`
                })
                user.balance -= req.body.amount
                user.save().then(user => {
                    res.json(user)
                })
            }
        });
    })
})