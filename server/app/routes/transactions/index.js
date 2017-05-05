'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var chalk = require('chalk')
var db = require('../../../db');
var Lesson = db.model('lesson')
var Classroom = db.model('classroom')
var Document = db.model('document')
var Quiz = db.model('quiz')
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

router.get('/create', (req, res) => {
    var method = req.query['method'];

    // var payment = {
    //     "intent": "sale",
    //     "payer": {},
    //     "transactions": [{
    //         "amount": {
    //             "currency": req.query['currency'],
    //             "total": req.query['amount']
    //         },
    //         "description": req.query['description']
    //     }]
    // };

    var payment = {
            "intent": "sale",
            "payer": {
                "payment_method": "credit_card",
                "funding_instruments": [{
                    "credit_card": {
                        "number": "4883057219875543",
                        "type": "visa",
                        "expire_month": 11,
                        "expire_year": 2018,
                        "cvv2": "874",
                        "first_name": "Betsy",
                        "last_name": "Buyer",
                        "billing_address": {
                            "line1": "111 First Street",
                            "city": "Saratoga",
                            "state": "CA",
                            "postal_code": "95070",
                            "country_code": "US"
                        }
                    }
                }]
            },
            "transactions": [{
                "amount": {
                    "total": "7.47",
                    "currency": "USD",
                    "details": {
                        "subtotal": "7.41",
                        "tax": "0.03",
                        "shipping": "0.03"
                    }
                },
                "description": "The payment transaction description."
            }]
        }
        // if (method === 'paypal') {
        //     payment.payer.payment_method = 'paypal';
        //     payment.redirect_urls = {
        //         "return_url": "http://yoururl.com/execute",
        //         "cancel_url": "http://yoururl.com/cancel"
        //     };
        // } else if (method === 'credit_card') {
        //     var funding_instruments = [{
        //         "credit_card": {
        //             "type": req.query.type.toLowerCase(),
        //             "number": req.query.number,
        //             "expire_month": req.query['expire_month'],
        //             "expire_year": req.query['expire_year'],
        //             "first_name": req.query['first_name'],
        //             "last_name": req.query['last_name']
        //         }
        //     }];
        //     payment.payer.payment_method = 'credit_card';
        //     payment.payer.funding_instruments = funding_instruments;
        // }
    console.log(payment)
    paypal.payment.create(payment, function(error, payment) {
        console.log('hello?')
        if (error) {
            console.log(error);
            res.json({
                'error': error
            });
        } else {
            console.log('hello')
            res.json({
                'payment': payment
            });
        }
    });
})

router.post('/payout', (req, res) => {
    //this is going to be the route that teachers get paid
})