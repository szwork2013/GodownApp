'use strict';

// Utilize Lo-Dash utility library
var _ = require('lodash'),node_env =process.env.NODE_ENV;


// Extend the base configuration in all.js with environment
// specific configuration
module.exports = _.extend(
    require(__dirname + '/../config/env/all.js'),
    require(__dirname + '/../config/env/' + node_env + '.js') || {}
);
console.log("STARTING PROCESS-------------------");
console.log(process.env);
console.log(process.env.NODE_ENV);
//require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js')