/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

var repository=(function(){

/**
 *Create
 **/
function create(data, callback)
{
    var doc = new User();

    doc.company_id = data.company_id;
    doc.password = data.password;
    doc.username=data.username;
    doc.email=data.email;
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
    User.find({},function (error, result) {
        callback(error, result);
    });

}

/**
 *Read One/FindById
 **/
function readOne(id,callback)
{
    User.findById(id,function (error, result) {
        callback(error, result);
    });

}
/**
 *FindByFields
 **/
function read(jsonCriteria,callback)
{
    console.log(jsonCriteria);
    User.findOne(jsonCriteria,function (error, result) {
        callback(error, result);
    });

}
/**
 *Authenticate
 **/
function auth(username,password,callback)
{
        read({email:username,password:password},callback);
//    User.findOne({email:username},function (error, result) {
//        if(!error && result)//username validation successful
//        {
//            var passwordMatched=User.methods.authenticate(password);
//            if(passwordMatched)
//                callback(null, result);
//            else
//                callback(new Error("Password is invalid"), result);
//        }
//        else callback(new Error("Invalid Credentials Specified"), result);
//
//
//    });

}


/**
 *
 * Edit/Update
 **/
function edit(data, callback)
{
    readOne(id, function (err, doc) {
        if (err){
            callback(err, null);
        }
        else {
            doc.updated = new Date();
            doc.company_id = data.company_id;
            doc.username = data.username;
            doc.password = data.password;
            doc.email = data.email;
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
    readOne(id, function (err, item) {
        if (err){
            callback(err, null);
        } else {
            User.remove(item,function (err, result) {
                callback(err, result);
            });
        }
    });

}
    return {
        AddNew:create,
        GetById:readOne,
        GetByCriteria:read,
        AuthenticateUser:auth,
        Update:edit,
        Remove:remove,
        GetAll:readAll

    };
})();

module.exports=repository;