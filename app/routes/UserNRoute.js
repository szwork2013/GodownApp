'use strict';

// User routes use users controller
var user = require('../controllers/UserNCtrl');

module.exports = function(app) {

    // Setting up the users api
    //app.post('/users', user.create);
    // Setting up the userId param
    //app.param('userId', user.user);
    //authenticate
    app.post('/whUser',user.session);

};
