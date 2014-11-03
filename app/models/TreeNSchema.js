/**
 * Created by naveed on 4/8/14.
 */
var mongoose = require('mongoose'),
  //  materializedPlugin = require('mongoose-materialized'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * User Schema
 */
var TreeSchema = new Schema({

    owner_id:{type:String, Default:"owner"},
    parent_id:String,
    code:Number,
    name:String,
    children:[],
    created :Date,
    updated :Date
    },
    {
        collection:'trees'
    }
);

//TreeSchema.plugin(materializedPlugin);


mongoose.model('Tree', TreeSchema);