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

router.post('/sale', (req, res) => {
    var payment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://yoururl.com/execute",
            "cancel_url": "http://yoururl.com/cancel"
        },
        "transactions": [{
            "amount": {
                "total": "5.00",
                "currency": "USD"
            },
            "description": "My awesome payment"
        }]
    };
})