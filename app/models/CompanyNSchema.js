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
var CompanySchema = new Schema({

    code: {
        type: String,
        unique: true
    },
    name: String,
    coa_id: String,
    nic: String,
    email: String,
    address: String,
    plot: String,
    phone1: String,
    phone2: String,
    phone3: String,
    fax: String,
    mobile: String,
    ntn: String,
    created :Date,
    updated :Date
    },
    {
        collection:'companies'
    }
);

mongoose.model('Company', CompanySchema);