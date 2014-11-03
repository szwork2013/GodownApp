/**
 * Created by naveed on 3/24/14.
 */

app.directive('mycombo',function(){
    return {
        restrict: 'E',
        require: '^ngModel',
        scope: {
            ngModel: '='
        },
        template: '<select ng-model="ngModel" ng-options="a._id as a.name for a in modelData">' +
            '<option value="">-- Select One --</option>' +
            '</select>',
        controller: ['$scope','$rootScope', 'ajax', function($scope,$rootScope, ajax) {

            $scope.init = function(route_entity,filter_id) {
                console.log("mylist invoked for "+route_entity);
                console.log("with filter: "+filter_id);
                ajax.Get(
                    {
                        route_entity: route_entity,
                        forceRefresh:true,
                        //id:filter_id,
                        url:$rootScope.user.company_id?"/wh/"+route_entity+"/bycompany/"+$rootScope.user.company_id:null,
                        callback: function (res) {//Success or Failure?
                            if(res.result==='success'){

                               // console.log(res.data.data.data);
                                var _tmp = [];
                                angular.forEach(res.data.data.data, function(value){
                                    _tmp.push(value);
                                });

                                $scope.modelData = _tmp;
                            }
                        }
                    }
                );
            }
        }],
        link: function(scope, iElement, iAttrs, ctrl) {
            console.log(iAttrs);
            scope.init(iAttrs.route,iAttrs.filter);
        }
    }

});
