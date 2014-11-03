/**
 * Created by naveed on 4/8/14.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
//1-load schema:already done in server.js
//2-load Repository


function TreeCRUDController(){

//set Service
    var Service=require('../models/TreeNService');

    var _setService=function(route_entity){
        /*switch(route_entity){
            case "owner":
                Service=require('../models/OwnerNService');
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
            default :
                throw Error("Controller not init!");
        }*/
    };

    var _GetAll = function(req, res) {
        var  entity= req.params.entity;
        console.log(entity);
        _setService(entity);

        Service.GetAll(function(error,docs) {
                console.log(entity+".GetAll:"+docs);
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
        var  entity= req.params.entity;
        _setService(entity);
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
        var  entity= req.params.entity;
        _setService(entity);
        console.log(req.body);
        Service.AddNew(req.body,
            function(error,doc,children) {
                console.log("AddNew:"+doc);
                console.log("children:"+children);
                if(children.length>0)
                    search(doc,children,Service );
                if(!error && doc)
                {
                    res.json({status:201,data:doc});
                }
                else
                {
                    res.send(417);
                }
            }
        );
    };

    var search=function(node,array,Service)
    {
        console.log("ID"+node);




        array.forEach(function(value,index,array){
            value.parent_id=node._id;
            Service.AddNew(value,function(error,doc,children) {
                console.log("AddNew:"+doc);
                console.log("children:"+children)
                if(children.length>0)
                    search(doc,children,Service );
            });






        });
    }

    var _Update=function(req,res){
        var  entity= req.params.entity;
        _setService(entity);
        Service.Update(req.body,function(error,doc) {
                console.log("Update:"+doc);
                if(!error && doc)
                {
                    res.json({status:201,data:doc});
                }
                else
                {
                    res.send(417);
                }
            }
        );
    };

    var _Remove=function(req,res){
        var  entity= req.params.entity;
        _setService(entity);
        Service.Remove(req.params.id,function(error,doc){
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
    return {
        AddNew:_AddNew,
        GetById:_GetById,
        Update:_Update,
        Remove:_Remove,
        GetAll:_GetAll
    };
};

module.exports=TreeCRUDController;