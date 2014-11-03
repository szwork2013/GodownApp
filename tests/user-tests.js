var mongoose = require('mongoose'),UserService, db;

module.exports = {
    setUp: function(callback) {
        try {
            console.log('Setting up...');
            //1-load schema
            require('../app/models/UserNSchema');
            //2-load Repository
            UserService=require('../app/models/UserNService');
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
//
    create: function(test) {
        console.log('running first  test:CREATE');
        UserService.AddNew({name: "naveedjb",email: "cto@zeesoft.com",username:"naveed jabbar",
                password:"123" },
            function(err) {
            test.ifError(err);
            test.done();
        });
    },
//    find:function(test){
//
//        console.log('running test:GET');
//        UserService.AuthenticateUser("zee@zeesoft.com","123", function(err,result) {
//                console.log('err:'+err);
//                console.log('result:'+result);
//                if(!err && result){
//                    test.ok(result);
//                }
//                else
//                    test.ok(false,"Record not found");
//                    test.done();
//            }
//        );
//
//    }
//    update: function(test) {
//        console.log('running test:UPDATE');
//        var user=new User({_id: "5312dc6e23f2b13011051e04",name: "zz e",email: "email",username:"zeezee6203",password:"123" });
//        user.save(function(err) {
//            test.ifError(err);
//            test.done();
//        });
//    }
//
};
