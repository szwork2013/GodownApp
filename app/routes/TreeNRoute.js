/**
 * Created by naveed on 4/8/14.
 */
'use strict';
//load Generic CRUD Controller
var CRUDController = require('../controllers/TreeNCtrl');
module.exports = function(app) {

    var ctrl=new CRUDController();

    app.get("/whs/tree/",ctrl.GetAll);
    app.post('/whs/tree/',ctrl.AddNew);
    app.get("/whs/tree/:id", ctrl.GetById);
    app.put("/whs/tree/", ctrl.Update);
    app.delete("/whs/tree/:id",ctrl.Remove);

};
