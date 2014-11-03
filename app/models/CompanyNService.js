/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Company= mongoose.model('Company');


var repository=(function(){

function create(data, callback)
{
    var doc = new Company();

    doc.code = data.code;
    doc.coa_id = data.coa_id;
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
        console.log("company/owner created:");
        console.log(result);
        console.log(error);
        if(result){
            var UserService=require('./UserNService');
            UserService.AddNew({company_id:result._id,username:data.name,password:data.password,email:data.email},function (e, rs) {
                console.log("user creater for owner:"+data.name);
                console.log(rs);
                    callback(error, result);
            });
        } else    callback(error, result);
    });
}

function readByCompanyId(id,callback)
{
    Company.find({_id:id},function (error, result) {
        console.log(result);
        callback(error, result);
    });

}

function readAll(callback)
{
    Company.find({},function (error, result) {
        callback(error, result);
    });

}


    function readOne(id,callback)
{
    Company.findById(id,function (error, result) {
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
            doc.name = data.name;
            doc.coa_id = data.coa_id;
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
                console.log("company/owner created:");
                console.log(result);
                var UserService=require('./UserNService');
                UserService.GetByCriteria({company_id:data._id},function(e,r){
                    r.username=data.name;
                    r.password=data.password;
                    r.email=data.email;
                    r.save(function (err2, result2) {
                        console.log('user credentials updated  for owner/company:'+data.name);
                        callback(err2, result2);
                    });

                });

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

            checkLink(id, doc,callback);

    /*        var Godown = require('./GodownNService');
            Godown.GetByCompanyId(id, function (error, result) {
                console.log("Get Godown")
                console.log(error);
                console.log(result.length);
                var cache = require('memory-cache');
                cache.put('Godown', result);
            });
                var Room = require('./RoomNService');


                Room.GetByCompanyId(id, function (error, result) {
                    console.log("Get Room")
                    console.log(error);
                    console.log(result);

                    var cache = require('memory-cache');
                    cache.put('Room',result);
                    *//*if (result.length > 0)
                        callback(new Error("Room Entry found"), result);*//*
                });

            var Agreement = require('./AgreementNService');

            Agreement.GetByCompanyId(id,function(error, result){
                console.log("Get Room")
                console.log(result);
                var cache = require('memory-cache');
                cache.put('Agreement',result);



            });


            setTimeout(function(){

                var str= ""

                var cache = require('memory-cache');

                var godown=cache.get("Godown");
                var room=cache.get("Room");
                var agreement=cache.get("Agreement");

                if(godown.length)
                    str+="Godown, ";
                if(room.length)
                    str+="Room, ";
                if(agreement.length)
                    str+="Agreement"

                if(godown.length||room.length||agreement.length)
                        callback(new Error(str),null);
                else
                {

                    Company.remove(doc,function (err, result) {
                        callback(err, result);
                    });

                }


            },200);
*/
               /* Company.remove(doc,function (err, result) {
                    callback(err, result);
                })*/








        }
    });

}

function checkLink(id,callback)
{
    var Godown = require('./GodownNService');
    Godown.GetByCompanyId(id, function (error, result) {
        console.log("Get Godown")
        console.log(error);
        console.log(result.length);
        var cache = require('memory-cache');
        cache.put('Godown', result);
    });
    var Room = require('./RoomNService');


    Room.GetByCompanyId(id, function (error, result) {
        console.log("Get Room")
        console.log(error);
        console.log(result);

        var cache = require('memory-cache');
        cache.put('Room',result);
        /*if (result.length > 0)
         callback(new Error("Room Entry found"), result);*/
    });

    var Agreement = require('./AgreementNService');

    Agreement.GetByCompanyId(id,function(error, result){
        console.log("Get Room")
        console.log(result);
        var cache = require('memory-cache');
        cache.put('Agreement',result);



    });

    setTimeout(function(){

        var str= ""

        var cache = require('memory-cache');

        var godown=cache.get("Godown");
        var room=cache.get("Room");
        var agreement=cache.get("Agreement");

        if(godown.length)
            str+="Godown, ";
        if(room.length)
            str+="Room, ";
        if(agreement.length)
            str+="Agreement"

        console.log("After Query");
        console.log(str);
        if(godown.length||room.length||agreement.length)
            callback(new Error(str),null);
        else
        {

            Company.remove(doc,function (err, result) {
                callback(err, result);
            });

        }


    },15);

}


    return {
        AddNew:create,
        GetById:readOne,
        Update:edit,
        Remove:remove,
        GetByCompanyId:readByCompanyId,
        GetAll:readAll
    };
})();

module.exports=repository;