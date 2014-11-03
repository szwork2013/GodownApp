'use strict';
//load Generic CRUD Controller
var CRUDController = require('../controllers/GenericNCtrl');
module.exports = function(app) {

    var ctrl=new CRUDController();

    app.get("/wh/:entity",ctrl.GetAll);
    app.post('/wh/:entity',ctrl.AddNew);
    app.get("/wh/:entity/:id", ctrl.GetById);
    app.get("/wh/:entity/bycompany/:id", ctrl.GetByCompanyId);
    app.put("/wh/:entity", ctrl.Update);
    app.delete("/wh/:entity/:id",ctrl.Remove);

};
