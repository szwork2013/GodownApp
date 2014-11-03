/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Room = mongoose.model('Room');


var repository=(function(){

function create(data, callback)
{
    var doc = new Room();

    doc.code = data.code;
    doc.name = data.name;
    doc.area=data.area;
    doc.rate=data.rate;
    doc.rent=data.rent;
    doc.company_id=data.company_id;
    doc.coa_id = data.coa_id;
    doc.created = new Date();
    doc.updated = new Date();
    doc.save(function (error, result) {
        console.log(error);
        callback(error, result);
    });
}


function readAll(callback)
{
    Room.find({},function (error, result) {
        callback(error, result);
    });

}

function readByCompanyId(id,callback)
{
  Room.find({company_id:id},function (error, result) {
      console.log(result);
      callback(error, result);
  });

}

function readOne(id,callback)
{
    Room.findById(id,function (error, result) {
        callback(error, result);
    });

}

function read(jsonCriteria,callback)
{
    console.log(jsonCriteria);
    Room.findOne(jsonCriteria,function (error, result) {
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
            doc.area=data.area;
            doc.rate=data.rate;
            doc.rent=data.rent;
            doc.company_id=data.company_id;
            doc.coa_id = data.coa_id;
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
           checkLink(id,doc,callback);
           /*Room.remove(doc,function (err, result) {
                callback(err, result);
            });*/
        }
    });

}

    function checkLink(id,doc, callback)
    {

        var Agreement = require('./AgreementNService');

        Agreement.GetByCriteria({room_id:id},function(error, result){
            console.log("Get Agreement")
            console.log(result);
            var cache = require('memory-cache');
            cache.put('Agreement',result);



        });

        setTimeout(function(){

            var str= ""

            var cache = require('memory-cache');


            var agreement=cache.get("Agreement");

            console.log("AGREEMENT RET");
            console.log(agreement);

            if(agreement)
                str+="Agreement"

            console.log("After Query");
            console.log(str);
            if(agreement)
                callback(new Error(str),null);
            else
            {

                console.log("DOC"+doc);
              //       callback(new Error("ROOM DELETED"),null );
                Room.remove(doc,function (err, result) {
                    callback(err, result);
                });

            }


        },50);

    }
    return {
        AddNew:create,
        GetById:readOne,
        GetByCriteria:read,
        GetByCompanyId:readByCompanyId,
        Update:edit,
        Remove:remove,
        GetAll:readAll
    };
})();

module.exports=repository;