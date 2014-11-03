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
var GodownSchema = new Schema({
    code: {
        type: String,
        unique: true
           },
    company_id: String,
    coa_id: String,
    name: String,
    area : String,
    orate: Number,
    orent: Number,
    urate: Number,
    urent: Number,
    totalRent: Number,
    totalRate: Number,
    created :Date,
    updated :Date
    },
    {
        collection:'godowns'
    }
);
mongoose.model('Godown', GodownSchema);