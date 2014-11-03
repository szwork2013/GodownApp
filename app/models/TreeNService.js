/**
 * Created by naveed on 4/8/14.
 */
var mongoose = require('mongoose'),

    Tree = mongoose.model('Tree');

var repository=(function(){

    /**
     *Create
     **/
    function create(data, callback)
    {
       console.log(data);

        var doc = new Tree();


        doc.owner_id=data.owner_id;
        doc.code=data.code;
        doc.name=data.title;
        doc.parent_id=data.parent_id;
       // doc.modified:data.modified;//DateTime
      //  doc.parent_id= data.parent_id;
     //   doc.children=data.children;
        doc.created = new Date();
        doc.updated = new Date();
        var resultTo;
        doc.save(function (error, result) {


            resultTo=result._id;
            console.log("result :"+result);
            console.log("resultTo :"+resultTo);
            console.log('DATA'+data);
            callback(error, result,data.children);
        });
       // console.log("resultTo :"+resultTo);
       // if(data.children.length>0)
      //      search(resultTo,data.children);

    }

    var search=function(node,array)


    {
        console.log("ID"+node);
        var doc=new Tree();

        array.forEach(function(data,index,array){

            doc.owner_id=data.owner_id;
            doc.code=data.code;
            doc.name=data.title;
            // doc.modified:data.modified;//DateTime
              doc.parent_id= node;
            //   doc.children=data.children;
            doc.created = new Date();
            doc.updated = new Date();
            var savResult;
            doc.save(function (error, result) {
                savResult=result._id;
                //callback(error, result);
            });

            if(data.children.length>0)
                search(savResult,data.children);

           /* node.appendChild({name: value.title}, function(err, vega){
                if(value.children.length>0)
                    search(vega,value.children);*/


                // vega: { name: "Vegetables", parentId: [foods ID], path: ',[foods ID]' }
         //   });

      //      if(node.roleName==value.roleName && node.roleId==value.roleId)
         //       array.splice(index,1);


        });
    }
    /**
     *Read All
     **/
    function readAll(callback)
    {
        Tree.find({},function (error, result) {
            callback(error, result);
        });

    }

    /**
     *Read One/FindById
     **/
    function readOne(id,callback)
    {
        Tree.findById(id,function (error, result) {
            callback(error, result);
        });

    }
    /**
     *FindByFields
     **/
    function read(jsonCriteria,callback)
    {
        console.log(jsonCriteria);
        Tree.findOne(jsonCriteria,function (error, result) {
            callback(error, result);
        });

    }

    /**
     *
     * Edit/Update
     **/
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
        readOne(id, function (err, doc) {
            if (err){
                callback(err, null);
            } else {
                Tree.remove(doc,function (err, result) {
                    callback(err, result);
                });
            }
        });

    }
    return {
        AddNew:create,
        GetById:readOne,
        GetByCriteria:read,
        Update:edit,
        Remove:remove,
        GetAll:readAll
    };
})();

module.exports=repository;