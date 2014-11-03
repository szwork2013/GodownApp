"use strict";
app.controller('coaCtrl',
    function ($scope,$rootScope, $location, ajax, toaster,guid,_) {

        //console.log("route_entity="+route_entity );
        $scope.record={'company_id':$rootScope.user.company_id};
        $scope.data = [];
        $scope.dbdata = [];
        //mock  data
//        $scope.data={"id":"e2382d61-e5e2-40c8-8ec7-2bba253738e9","code":"00000","title":"Chart of Account","state":"old","children":[{"id":"309b3aea-6e16-4e34-aa5b-f4a69c87c1c6","code":"","title":"Assets","state":"new","parent_id":"e2382d61-e5e2-40c8-8ec7-2bba253738e9","children":[{"id":"eb267d49-bb98-46b5-835e-5ab3b77f8627","code":"","title":"Furniture","state":"new","parent_id":
//            "309b3aea-6e16-4e34-aa5b-f4a69c87c1c6","children":[]},{"id":"32d27b00-47a3-4783-86e9-22cce9de4878","code":"","title":"Building Expense","state":"new",
//            "parent_id":"309b3aea-6e16-4e34-aa5b-f4a69c87c1c6","children":[]}]},
//            {"id":"3af68a09-39ad-41d9-b4e4-804f22915528","code":"","title":"Liabilities","state":"new","parent_id":"e2382d61-e5e2-40c8-8ec7-2bba253738e9",
//                "children":[{"id":"1b41cfc7-cac9-4018-9fcc-bcd51727bd3f","code":"",
//                    "title":"Supplier Payables","state":"new","parent_id":"3af68a09-39ad-41d9-b4e4-804f22915528","children":[]},
//                    {"id":"e035e9ae-1332-4281-9b15-d92de398c2fc","code":"","title":"Staff Salaries","state":"new","parent_id":"3af68a09-39ad-41d9-b4e4-804f22915528",
//                        "children":[]}]}]};
        $scope.$watch("record.company_id", function(newValue, oldValue) {
            if(newValue!=oldValue){
                $scope.data = [];
                $scope.dbdata = [];
                $scope.ownerChange();
            }
        });
//        var processData=function(fresh){
//            if($scope.data && $scope.data.length>0)
//                _nestDbData(fresh);
//        };
        getAll($scope.record.company_id,function(dbdata){_nestDbData(dbdata,false);});

        function getAll(company_id,cb) {
            ajax.Get(
                {
                    route_entity: 'coa',
                    forceRefresh:true,
                    url:company_id?"/wh/coa/bycompany/"+company_id:null,
                    callback: function (res) {//Success or Failure?
                        if(res.result==='success')
                        {
                            //console.log('getAll for owner='+company_id);
                            //console.log(res.data.data.data);
                            $scope.dbdata=[];
                            cb(res.data.data.data);
                        }
                        else
                        {
                            if(res.status=="417")
                                toaster.pop('error', "Operation Failed", "Something went wrong while processing your request. Please contact admin.");
                            else
                                toaster.pop("error","Unknown Error Occurred:"+res.status);
                        }
                    }
                }
            );
        }
        var _nestDbData=function(dbdata,fresh){

            //console.log("START: _nestDbData");
            function NestChildren(parent,data){
              //  console.log(parent);
                //console.log(data);

                var children=_.filter(data,function(item){


                    //console.log(item.parent_id+":"+parent.id);

                    return item.parent_id==parent.id;
                });

                parent.children=children;


                parent.state=fresh?'new':'old';
                //console.log("Done:"+parent.children.length);
                //console.log(parent.children);
                var j=1;
                _.each(parent.children,function(child){
                   // console.log("now looking for:");
                    //console.log(child);
                    child.code=parent.code+" "+j++;


                    NestChildren(child,data);
                });
            }

            var root={id:'e2382d61-e5e2-40c8-8ec7-2bba253738e9',code:'0',state:'old',name:'Chart Of Account',children:[]};

            NestChildren(root,dbdata);
            //console.log("DONE:dbdata nested");
            $scope.data=root;
        };



        $scope.ownerChange=function()
        {
            //console.log("OWNER CHANGED TO BE:"+$scope.record.company_id);

            if($scope.record.company_id){
                getAll($scope.record.company_id,function(dbdata){
                    if(dbdata&&dbdata.length>0)//coa exists
                    {
                        _nestDbData(dbdata,false);
                        return;
                    }
                    else{
                        if(!confirm("No COA found for the selected Owner. Do you want to copy from the master COA?"))
                        {//reset
                            console.log("create new coa for the owner");
                            $scope.data = [];
                            $scope.dbdata = [];
                            _nestDbData([],true);//create new coa for the owner
                            return;
                        }else{
                            console.log("fetch master coa for copying");
                            getAll(null,function(dbdata){_nestDbData(dbdata,true);});//fetch master coa for copying
                            return;
                        }
                    }
                });
            }
                    console.log("no owner selected? show master coa");
                    getAll($scope.record.company_id,function(dbdata){_nestDbData(dbdata,false);});//no owner selected? show master coa
        }
        var _flatten=function(parent,done_cb){

            var node=angular.copy(parent);

            node.company_id=$scope.record.company_id;
            //console.log('_flatten START with copied parent as:');
            //console.log(node);
            if(node.state!=='old')
            {
              //  console.log("pushing node:");
                if(node.id!='e2382d61-e5e2-40c8-8ec7-2bba253738e9')//skip root
                $scope.dbdata.push(node);
            }
            if((node.state=='new'||node.state=='modified'||node.state=='deleted') && node.children && node.children.length>0){
                _.each(node.children,function(node){
                    _flatten(node);
                });
            }

            if(node.state=='old'  && node.children && node.children.length>0){
                _.each(node.children,function(node){
                    _flatten(node);
                });
            }

            if(done_cb)
            done_cb();
        };
        var _reload = function () {
            getAll($scope.record.company_id,function(dbdata){_nestDbData(dbdata,false);});
        };

        $scope.save = function () {

            $scope.dbdata = [];
            _flatten($scope.data,function(){
              //  console.log($scope.data);
              //  console.log("DB DATA");
             //   console.log($scope.dbdata);
                ajax.Update(
                    {
                        route_entity: "coa",
                        data: $scope.dbdata,
                        callback: function (res) {
                            if(res.result==='success'){
                            //    console.log("SUCCESSFUL");
                                toaster.pop('success', "Chart of Accounts",
                                    "Changes Successful!");
                                _reload();
                            } else {
                                if(res.data.status=="400")
                                    toaster.pop('error', "Chart of Accounts",
                                        "Something went wrong while processing your request. Please contact admin.");
                                else
                                    toaster.pop("error","Unknown Error Occurred:"+res.data.status);
                            }
                        }
                    }
                );
            });


        };

        $scope.reload=_reload;
        $scope.cancel = function () {
            $location.path("/home");//list view page
        };

        $scope.getJson = function () {
            $scope.json = angular.toJson($scope.data);
            //$scope.dbjson= _.flatten($scope.data.children,'children');
            //_flatten($scope.data.children);
        };

        $scope.toggleMinimized = function (child) {
            child.minimized = !child.minimized;
        };

        $scope.addChild = function (child) {
            console.log(child);
            child.children.push({
                id:guid.New(),
                code:'',
                company_id:$scope.record.company_id,
                name: '',
                state:'new',
                parent_id:child.id,
                children: []
            });
            if(!$scope.$$phase)
            $scope.$apply();
        };
        $scope.change = function (child) {
            if(child.state=='old')
            child.state='modified';
        };
        var _markDeleted=function(node){
            node.state='deleted';
            //console.log(node);
            if(node.children && node.children.length>0){
                _.each(node.children,function(childNode){
                    _markDeleted(childNode);
                });
            }
        };
        $scope.remove = function (child) {
           // console.log("deleting "+child.name);
            _markDeleted(child);
//            function walk(target) {
//                var children = target.children,
//                    i;
//                if (children) {
//                    i = children.length;
//                    while (i--) {
//                        if (children[i] === child) {
//                            children[i].state='deleted';
//                            return;// children.splice(i, 1);
//                        } else {
//                            walk(children[i])
//                        }
//                    }
//                }
//            }
//            walk($scope.data);
        }

        $scope.update = function (event, ui) {

            var root = event.target,
                item = ui.item,
                parent = item.parent(),
                target = (parent[0] === root) ? $scope.data : parent.scope().child,
                child = item.scope().child,
                index = item.index();



            target.children || (target.children = []);

            function walk(target, child) {
                var children = target.children,
                    i;
                if (children) {
                    i = children.length;
                    while (i--) {
                        if (children[i] === child) {

                            return children.splice(i, 1);
                        } else {
                            walk(children[i], child);
                        }
                    }
                }
            }
            walk($scope.data, child);

            target.children.splice(index, 0, child);
        };

    });
