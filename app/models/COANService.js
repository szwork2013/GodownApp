/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    COA = mongoose.model('COA'),
    _=require('lodash');

  var repository=(function(){

/**
 *Read All
 **/
function readAll(callback)
{
    COA.find({company_id:null},function (error, result) {
        console.log(result);
        callback(error, result);
    });

}


/**
*Read One/FindById
**/
function readByCompanyId(id,callback)
{
  COA.find({company_id:id},function (error, result) {
      console.log(result);
      callback(error, result);
  });

}
/**
*Read One/FindById
**/
function readOne(id,callback)
{
  COA.findById(id,function (error, result) {
      callback(error, result);
  });

}
/**
 *
 * AllInOne=Edit/Add/Delete
 **/
function edit(data, callback)
{
    console.log("ok ready to save coa:");
    console.log(data);
            var _result=[];
            _.each(data,function(item){

               //console.log(item);
                if(item.state=='new'){//add or update
                    var doc = new COA();
                    doc.id = item.id;
                    doc.code = item.code;
                    doc.name = item.name;
                    doc.parent_id=item.parent_id;
                    doc.company_id=item.company_id;
                    //doc.created = new Date();
                  doc.updated = new Date();
                    doc.save(function (error, result) {
                        //console.log("Add cb:");
                        //console.log(error);
                        _result.push({result:error?error:'success',data:doc});
                        //callback(error, result);
                    });
                } else if(item.state=='modified'){
                    var doc;
                    readOne(item._id, function (err, oldDoc) {
                        if (!err)
                            doc=oldDoc;
                        doc.code = item.code;
                        doc.name = item.name;
                        doc.parent_id=item.parent_id;
                        doc.company_id=item.company_id;
                        //doc.created = new Date();
                        doc.updated = new Date();
                        doc.save(function (error, result) {
                            _result.push({result:error?error:'success',data:doc});

                        });

                    });
                } else if(item.state=='deleted'){
                    console.log("deleting:"+item.title);
                    readOne(item._id, function (err, doc) {
                        console.log(err);
                        console.log(doc);
                        if (err){
                            _result.push({result:err?err:'failure',data:doc});
                        } else {
                            COA.remove(doc,function (error, result) {
                                console.log(error);
                                console.log(result);
                                _result.push({result:error?error:'success',data:doc});
                            });
                        }
                    });
                }
            });
            console.log('Done');

            readAll(callback);
    }

    return {
        Update:edit,
        GetAll:readAll,
        GetByCompanyId:readByCompanyId
    };
})();

module.exports=repository;