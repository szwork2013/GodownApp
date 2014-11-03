'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
//1-load schema:already done in server.js
//2-load Repository
var UserService=require('../models/UserNService');


/**
 * Login
 */
exports.session = function(req, res) {
    console.log(req.body);
    var email = req.param('email');
    var pw = req.param('password');
    console.log("Signing In:"+email +":"+pw);
    UserService.GetByCriteria({
            email: email,password:pw
        },
        function(err,user) {

            console.log("user:"+user);

            if(!err && user)
            {
                req.session.currentUser=user;
                res.json({result:true,data:user});
            }
            else
            {
                res.send(401);
            }
        }
    );
};
