'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * User Schema
 */
var AgreementSchema = new Schema({

    agreementDate: Date,
    details: String,
    godown_id: String,
    company_id: String,
    customer_id: String,
    orent: Number,
    urent: Number,
    room_id: String,
    startDate:Date,
    endDate:Date,
    created :Date,
    updated :Date
    },
    {
        collection:'agreements'
    }
);

mongoose.model('Agreement', AgreementSchema);