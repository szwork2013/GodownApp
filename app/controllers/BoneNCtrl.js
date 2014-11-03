/**
 * Created by Naveed on 6/28/2014.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
//1-load schema:already done in server.js
//2-load Repository


function BoneCRUDController(){

//set Service
    var Service=require('../models/BoneNService');

  /*  var _setService=function(route_entity){
        switch(route_entity){
            case "company":
                Service=require('../models/CompanyNService');
                break;
            case "godown":
                Service=require('../models/GodownNService');
                break;
            case "room":
                Service=require('../models/RoomNService');
                break;
            case "customer":
                Service=require('../models/CustomerNService');
                break;
            case "agreement":
                Service=require('../models/AgreementNService');
                break;
            case "coa":
                Service=require('../models/COANService');
                break;
            default :
                throw Error("Controller not init!");
        }
    };*/


    var _GetByCompanyId = function(req, res) {


        Service.GetByCompanyId(company_id,function(error,docs) {

                if(!error && docs)
                {
                    res.json({status:201,data:docs});
                }
                else
                {
                    res.send(417);
                }
            }
        );
    };

    var _GetAll = function(req, res) {

        Service.GetAll(function(error,docs) {

                if(!error && docs)
                {
                    res.json({status:201,data:docs});
                }
                else
                {
                    res.send(417);
                }
            }
        );
    };


    var _GetById=function (req, res) {

        Service.GetById(req.params.id,function (error, doc) {
            console.log("GetById:"+doc);
            if(!error && doc)
            {
                res.json({status:201,data:doc});
            }
            else
            {
                res.send(417);
            }
        });

    };

    var _AddNew = function(req, res) {

        console.log(req.body);
        Service.AddNew(req.body,
            function(error,doc) {
                console.log("AddNew:"+doc);
                if(!error && doc)
                {
                    res.json({status:201,data:doc});
                }
                else
                {
                    res.send(417,error.message);
                }
            }
        );
    };

    var _Update=function(req,res){

        Service.Update(req.body,function(error,json) {
                console.log("Update Result:");
                console.log(json);

                if(!error && json)
                {
                    res.json({status:201,data:json});
                }
                else
                {
                    res.send(417);
                }
            }
        );
    };

    var _Remove=function(req,res){

        Service.Remove(req.params.id,function(error,doc){
            if(!error && doc)
            {
                res.json({status:201,data:doc});
            }
            else
            {
                // res.send(417);
                res.send(417,error.message);
            }
        });
    };
    return {
        AddNew:_AddNew,
        GetById:_GetById,
        Update:_Update,
        Remove:_Remove,
        GetAll:_GetAll,
        GetByCompanyId:_GetByCompanyId
    };
};

module.exports=BoneCRUDController;