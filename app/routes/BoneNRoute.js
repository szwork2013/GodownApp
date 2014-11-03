/**
 * Created by Naveed on 6/28/2014.
 */


var CRUDController = require('../controllers/BoneNCtrl');
module.exports = function(app) {

    var ctrl=new CRUDController();

    app.get("/bone",ctrl.GetAll);
    app.post('/bone',ctrl.AddNew);
    app.get("/bone/:id", ctrl.GetById);
    app.put("/bone", ctrl.Update);
    app.delete("/bone/:id",ctrl.Remove);

};