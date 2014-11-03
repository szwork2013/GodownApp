/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Owner = mongoose.model('Owner');

var repository=(function(){

/**
 *Create
 **/
function create(data, callback)
{
    var doc = new Owner();

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

/**
 *Read All
 **/
function readAll(callback)
{
    Owner.find({},function (error, result) {
        callback(error, result);
    });

}

/**
 *Read One/FindById
 **/
function readOne(id,callback)
{
    Owner.findById(id,function (error, result) {
        callback(error, result);
    });

}
/**
 *FindByFields
 **/
function read(jsonCriteria,callback)
{

    Owner.findOne(jsonCriteria,function (error, result) {
        callback(error, result);
    });

}

/**
 *
 * Edit/Update
 **/
function edit(data, callback)
{
    readOne(data._id, function (err, doc) {
        if (err){
            callback(err, null);
        }
        else {
            doc.updated = new Date();
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

/**
 *
 * Delete
 **/
function remove(id,callback)
{
    readOne(id, function (err, doc) {
        if (err){
                callback(err, null);
        } else {
            Owner.remove(doc,function (err, result) {
                callback(err, result);
            });
        }
    });

}
    return {
        AddNew:create,
        GetById:readOne,
        GetByCriteria:read,
        Update:edit,
        Remove:remove,
        GetAll:readAll
    };
})();

module.exports=repository;