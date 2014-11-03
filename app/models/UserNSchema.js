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
var UserSchema = new Schema({

    email: String,
    company_id:String,
    username: {
        type: String,
        unique: true
    },
    created : Date,
    updated : Date,
    hashed_password: String,
    password:String,
    provider: String,
    salt: String
    },
    {
        collection:'users'
    }
);

mongoose.model('User', UserSchema);