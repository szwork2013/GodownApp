/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _=require('lodash'),
    Agreement = mongoose.model('Agreement');

var repository=(function(){

function create(data, callback)
{
    var doc = new Agreement();
    doc.agreementDate = data.agreementDate;
    doc.company_id=data.company_id;
    doc.details = data.details;
    doc.godown_id=data.godown_id;
    doc.customer_id=data.customer_id;
    doc.orent=data.orent;
    doc.urent=data.urent;
    doc.room_id=data.room_id;
    doc.startDate=data.startDate;
    doc.endDate=data.endDate;
    doc.created = new Date();
    doc.updated = new Date();
    doc.save(function (error, result) {
        callback(error, result);
    });
}

function readByCompanyId(company_id,callback)
{
    Agreement.find({},function (error, result) {
        callback(error, result);
    });

}

function _readByCompanyId(id,callback)
{
    var GodownService=require('./GodownNService');
    var RoomService=require('./RoomNService');
    var company_godowns=[];
    var company_rooms=[];
    var combined=[];
    GodownService.GetByCompanyId(id,function (e, rs) {
        company_godowns=rs;//get this company godowns

        RoomService.GetByCompanyId(id,function (e, rs) {
            company_rooms=rs;//get this company rooms

            readAll(function (error, result) {
                console.log("total agreements found:");
                console.log(result.length);
                var company_wise_agreements=[];
                //1- filter this collection by all company godowns
                _.each(company_godowns,function(godon){
                    var godon_agreements= _.filter(result,function(ag){
                        return ag.godown_id==godon._id;
                    });
                    company_wise_agreements=godon_agreements;
                });
                //2- filter this collection by all company rooms
                _.each(company_rooms,function(room){
                    var room_agreements= _.filter(result,function(ag){
                        return ag.room_id==room._id;
                    });
                    console.log("1:");
                    console.log(company_wise_agreements);
                    if(company_wise_agreements.length&&company_wise_agreements.length>0){
                        console.log("2:");
                        if(room_agreements.length&&room_agreements.length>0)
                        combined=company_wise_agreements.concat(room_agreements);
                        else
                        {
                            console.log("3:");
                            combined=company_wise_agreements;
                            combined.push(room_agreements);
                        }
                    }
                    else
                    {
                        console.log("4:");
                        combined.push(company_wise_agreements);
                        if(room_agreements.length&&room_agreements.length>0)
                            combined.concat(room_agreements);
                        else
                            combined.push(room_agreements);
                    }

                });
                console.log("combined:");
                console.log(combined);

                callback(error, combined);
            });
        });
    });
}

function readAll(callback)
{
    Agreement.find({},function (error, result) {
        callback(error, result);
    });

}

function readOne(id,callback)
{
    Agreement.findById(id,function (error, result) {
        callback(error, result);
    });

}

function read(jsonCriteria,callback)
{
    console.log(jsonCriteria);
    Agreement.findOne(jsonCriteria,function (error, result) {
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
            console.log(data.agreementDate);
            doc.updated = new Date();
            doc.company_id=data.company_id;
            doc.agreementDate = data.agreementDate;
            doc.details = data.details;
            doc.godown_id=data.godown_id;
            doc.room_id=data.room_id;
            doc.customer_id=data.customer_id;
            doc.officialRent=data.officialRent;
            doc.unofficialRent=data.unofficialRent;
            doc.roomCharges=data.roomCharges;
            doc.startDate=data.startDate;
            doc.endDate=data.endDate;
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
            Agreement.remove(doc,function (err, result) {
                callback(err, result);
            });
        }
    });

}


function readByCompanyId(id,callback)
{
    Agreement.find({company_id:id},function (error, result) {
        console.log(result);
        callback(error, result);
    });

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