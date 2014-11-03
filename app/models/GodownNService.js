/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Godown = mongoose.model('Godown');

var repository=(function(){

function create(data, callback)
{
    console.log("GodownNService: creating godown");
    var doc = new Godown();
    doc.code = data.code;
    doc.name = data.name;
    doc.coa_id = data.coa_id;
    doc.area=data.area;
    doc.orate=data.orate;
    doc.orent=data.orent;
    doc.urate=data.urate;
    doc.urent=data.urent;
    doc.totalRate=data.totalRate;
    doc.totalRent=data.totalRent;
    doc.company_id=data.company_id;
    doc.created = new Date();
    doc.updated = new Date();
    doc.save(function (error, result) {
        console.log(error);
        callback(error, result);
    });
}

function readAll(callback)
{
    Godown.find({},function (error, result) {
        callback(error, result);
    });

}

function readOne(id,callback)
{
    Godown.findById(id,function (error, result) {
        callback(error, result);
    });

}

function readByCompanyId(id,callback)
{
  Godown.find({company_id:id},function (error, result) {
      console.log(result);
      callback(error, result);
  });

}

function read(jsonCriteria,callback)
{
    console.log(jsonCriteria);
    Godown.find(jsonCriteria,function (error, result) {
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
            doc.company_id=data.company_id;
            doc.name = data.name;
            doc.coa_id = data.coa_id;
            doc.area=data.area;
            doc.orate=data.orate;
            doc.orent=data.orent;
            doc.urate=data.urate;
            doc.urent=data.urent;
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
           /*Godown.remove(doc,function (err, result) {
                callback(err, result);
            });*/

        checkLink(id,doc,callback);
        }
    });

}

    function checkLink(id,doc, callback)
    {

        var Agreement = require('./AgreementNService');

        Agreement.GetByCriteria({godown_id:id},function(error, result){
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
           //     callback(new Error("DATA DELETED"),null );
                Godown.remove(doc,function (err, result) {
                    callback(err, result);
                });

            }


        },50);

    }

    return {
        AddNew:create,
        GetById:readOne,
        GetByCompanyId:readByCompanyId,
        GetByCriteria:read,
        Update:edit,
        Remove:remove,
        GetAll:readAll
    };
})();

module.exports=repository;