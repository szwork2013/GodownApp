'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * COA Schema
 */
var COASchema = new Schema({
    id: String,
    code:String,
    company_id: String,
    parent_id: String,
    name: String,
    created :{type:Date,default:Date.now},
    updated :Date
    },
    {
        collection:'accounts'
    }
);

mongoose.model('COA', COASchema);