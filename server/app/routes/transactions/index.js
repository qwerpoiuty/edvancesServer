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

router.post('/paypal-sale', (req, res) => {
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://return.url",
            "cancel_url": "http://cancel.url"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": req.body.payment_description
        }]
    };


    paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
        }
    });


})

router.post('/cc-sale', (req, res) => {
    // {
    //     "type": "visa",
    //     "number": "4417119669820331",
    //     "expire_month": "11",
    //     "expire_year": "2018",
    //     "cvv2": "874",
    //     "first_name": "Joe",
    //     "last_name": "Shopper",
    //     "billing_address": {
    //         "line1": "52 N Main ST",
    //         "city": "Johnstown",
    //         "state": "OH",
    //         "postal_code": "43210",
    //         "country_code": "US"
    //     }
    // }
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "credit_card",
            "funding_instruments": [{
                "credit_card": req.body.credit_card
            }]
        },
        "transactions": [{
            "amount": {
                "total": "7",
                "currency": "USD",
                "details": {
                    "subtotal": "5",
                    "tax": "1",
                    "shipping": "1"
                }
            },
            "description": "This is the payment transaction description."
        }]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
        }
    });
})