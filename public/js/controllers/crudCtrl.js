'use strict';
app.controller('crudCtrl', function ($scope,$rootScope,http, ajax, toaster,$location,$routeParams,route_entity) {

    $scope.thisHideMe = false;
    $scope.toggle = function(){
        console.log($scope.thisHideMe);
        if($scope.thisHideMe){
            $scope.thisHideMe = false;
        }else{
            $scope.thisHideMe = true;
        }
    }
    $scope.id =$routeParams.id;
    $scope.EditMode = $scope.id?true:false;
    $scope.record={'company_id':$rootScope.user.company_id};
    $scope.showCompanyDropDown=$rootScope.user.company_id==null;
    console.log("route_entity="+route_entity );
    var PATH_LIST_VIEW="/"+route_entity+"s";

    var fetch=function(id){
        ajax.Get(
            {
                route_entity: route_entity,
                id:id,
                callback: function (res) {//Success or Failure?
                    if(res.result==='success')
                        $scope.record=res.data.data.data;
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
    };
    $scope.cancel = function () {
        $location.path(PATH_LIST_VIEW);//list view page
    };
    $scope.add = function (record) {
        ajax.Add(
            {
                route_entity: route_entity,
                data: record,
                callback: function (res) {
                    if(res.result==='success'){
                    toaster.pop('success', "New Record Creation", "Operation Successful!");
                    $location.path(PATH_LIST_VIEW);//list view page
                    } else {
                    if(res.data.status=="417")
                        toaster.pop('error', "Operation Failed", "Something went wrong while processing your request. Please contact admin.");
                    else
                        toaster.pop("error","Unknown Error Occurred:"+res.data.status);
                    }
                }
            }
        );
    };
    $scope.update = function (record) {
        ajax.Update(
            {
                route_entity: route_entity,
                data: record,
                callback: function (res) {
                    if(res.result==='success'){
                        toaster.pop('success', "New Record Creation", "Operation Successful!");
                        $location.path(PATH_LIST_VIEW);//list view page
                    } else {
                        if(res.data.status=="400")
                            toaster.pop('error', "Operation Failed", "Something went wrong while processing your request. Please contact admin.");
                        else
                            toaster.pop("error","Unknown Error Occurred:"+res.data.status);
                    }
                }
            }
        );
    };
    $scope.convertDate=function(inputValue){
        console.log('converting...'+inputValue);
        var date = inputValue?new Date(inputValue):new Date();
        var transformedInput=date.toLocaleDateString();
        return transformedInput;
    };
    $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
    };
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
    if($scope.id){//load record for edit form
        fetch($scope.id);
    }

    $scope.entityArray=[];
    $scope.saveEntity=function(entity){
        console.log(entity);



        $scope.entityArray.push(entity);
        $scope.entity={};
        $scope.toggle();

        console.log($scope.entityArray);
    }


});