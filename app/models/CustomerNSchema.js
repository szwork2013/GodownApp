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
var CustomerSchema = new Schema({
    code: {
        type: String,
        unique: true
            },
        name: String,
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
        collection:'customers'
    }
);

mongoose.model('Customer', CustomerSchema);