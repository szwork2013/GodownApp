'use strict';

exports.render = function(req, res) {
    var username=req.session&& req.session.currentUser? req.session.currentUser.username:null;
    res.render('index', {user:username});

};
