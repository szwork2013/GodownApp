/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Customer = mongoose.model('Customer');

var repository=(function(){

function create(data, callback)
{
    var doc = new Customer();

    doc.code = data.code;
    doc.name = data.name;
    doc.phone1=data.phone1;
    doc.phone2=data.phone2;
    doc.phone3=data.phone3;
    doc.plot=data.plot;
    doc.email=data.email;
    doc.address=data.address;
    doc.fax=data.fax;
    doc.mobile=data.mobile;
    doc.nic=data.nic;
    doc.ntn=data.ntn;
    doc.created = new Date();
    doc.updated = new Date();
    doc.save(function (error, result) {
        callback(error, result);
    });
}

function readByCompanyId(company_id,callback)
{
    Customer.find({},function (error, result) {
        callback(error, result);
    });

}

function readAll(callback)
{
    Customer.find({},function (error, result) {
        callback(error, result);
    });

}

function readOne(id,callback)
{
    Customer.findById(id,function (error, result) {
        callback(error, result);
    });

}

function read(jsonCriteria,callback)
{
    console.log(jsonCriteria);
    Customer.findOne(jsonCriteria,function (error, result) {
        callback(error, result);
    });

}

function edit(data, callback)
{
    readOne(data._id, function (err, doc) {
        if (err){
            callback(err, null);
        }
        else {
            doc.updated = new Date();
            doc.code = data.code;
            doc.name = data.name;
            doc.phone1=data.phone1;
            doc.phone2=data.phone2;
            doc.phone3=data.phone3;
            doc.plot=data.plot;
            doc.email=data.email;
            doc.address=data.address;
            doc.fax=data.fax;
            doc.mobile=data.mobile;
            doc.nic=data.nic;
            doc.ntn=data.ntn;
            doc.save(function (err, result) {
                callback(err, result);
            });
        }
    });
}

function remove(id,callback)
{
    readOne(id, function (err, doc) {
        if (err){
            callback(err, null);
        } else {
            Customer.remove(doc,function (err, result) {
                callback(err, result);
            });
        }
    });

}
    return {
        AddNew:create,
        GetById:readOne,
        GetByCriteria:read,
        GetByCompanyId:readByCompanyId,//as currently customers are not company dependent
        Update:edit,
        Remove:remove,
        GetAll:readAll
    };
})();

module.exports=repository;