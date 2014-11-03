'use strict';
app.controller('listCtrl', function ($scope, ajax, toaster,$location,$rootScope,route_entity) {

    console.log("route_entity="+route_entity +" for user:");
    console.log($rootScope.user);
    $scope.listData = [];
    getAll();
    function getAll() {
        ajax.Get(
            {
                route_entity: route_entity,
                url:$rootScope.user.company_id?"/wh/"+route_entity+"/bycompany/"+$rootScope.user.company_id:null,
                forceRefresh:true,
                callback: function (res) {//Success or Failure?
                    if(res.result==='success')
                        $scope.listData = res.data.data.data;
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

    $scope.edit=function(record){

        $location.path("/"+route_entity+"/"+record._id);
    };

    $scope.delete = function(record){
        ajax.Delete(
            {
                route_entity: route_entity,
                id: record._id,
                callback: function (res) {//Success or Failure?
                    if(res.result==='success')
                    {
                        toaster.pop('success', "Record Deletion", "Record successfully deleted!");
                        getAll();
                    }
                    else
                    {
                        if (res.status == 400)
                            toaster.pop('error', "Faild to create", "Something went wrong while saving.");
                        else {
                            console.log(res);
                            toaster.pop("error", "Unknown Error Occurred:" + res.data.data);
                        }
                    }
                }
            }
        );
    };

    $scope.refresh=getAll;

    $scope.add=function(){
        $location.path("/"+route_entity);
    };
});