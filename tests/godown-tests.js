var mongoose = require('mongoose'),ownerService,godownService, db;

module.exports = {
    setUp: function(callback) {
        try {
            console.log('Setting up...');
            //1-load schema
            require('../app/models/OwnerNSchema');
            require('../app/models/GodownNSchema');
            //2-load Repository
            ownerService=require('../app/models/OwnerNService');
            godownService=require('../app/models/GodownNService');
            //3- connect
            mongoose.connection.once('open', function() {
                console.log('Opened connection');
                callback();
            });
            var connection_string="mongodb://zee:my2014pw@ds063307.mongolab.com:63307/meanzee";//web
            connection_string="mongodb://localhost:27017/meanzee-localdb";
            db = mongoose.connect(connection_string);
            console.log('Started connection, waiting for it to open');
        }

        catch (err) {
            console.log('Setting up failed:', err.message);
        }
    },

    tearDown: function(callback) {
        console.log('Ending...');
        try {
            console.log('Closing connection');
            db.disconnect();
            callback();
        }

        catch (err) {
            console.log('Tearing down failed:', err.message);
        }
    },

//    Create: function(test) {
//        console.log("ownerService.GetAll...in create test");
//        ownerService.GetAll(function(err,docs){
//            console.log("allOwners:"+docs);
//            godownService.AddNew({code: "G1",name:"R-723",owner_id:docs[0]._id },
//                function(error,doc) {
//                    console.log("AddNew:"+doc);
//                    if(!error && doc)
//                    {
//                        test.ok(doc);
//                    }
//                    test.ifError(error);
//                    test.done();
//                }
//            );
//        });
//
//    },
//    GetAll:function(test){
//
//        godownService.GetAll(function(error,docs) {
//                console.log("GetAll:"+docs);
//                if(!error && docs)
//                {
//                    test.ok(docs);
//                }
//
//                test.ifError(error);
//                test.done();
//            }
//        );
//    },
    GetWithOwner:function(test){

        godownService.GetByIdWithOwner("5325cc215130c1640a037f1a",function (error, doc) {
            console.log("GetByIdWithOwner:"+doc);
            if(!error && doc)
            {
                test.ok(doc);
            }
            test.ifError(error);
            test.done();
        });
    }
    //,
//    Update: function(test) {
//        Service.Update({_id:"53247de0ab617f901ddd9d15",email:"email",code: "HMsR211",name:"Hasji Muhammad 111Rahim121" },function(error,doc) {
//                console.log("Update:"+doc);
//                if(!error && doc)
//                {
//                    test.ok(doc);
//                }
//                test.ifError(error);
//                test.done();
//            }
//        );
//    }
};
