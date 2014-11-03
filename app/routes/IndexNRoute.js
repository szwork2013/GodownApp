'use strict';

module.exports = function(app) {

    // Home route
    var index = require('../controllers/IndexNCtrl');

    app.get('/',index.render);

};
