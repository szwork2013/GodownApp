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
var RoomSchema = new Schema({
    code: {
        type: String
           },
    company_id: String,
    coa_id: String,
    name: String,
    area : String,
    rate: String,
    rent: String,
        created :Date,
        updated :Date
    },
    {
        collection:'rooms'
    }
);
RoomSchema.pre('remove', function(next) {
    console.log("removing...");
    console.log(this);
    next();
});
mongoose.model('Room',RoomSchema);