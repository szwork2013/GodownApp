/**
 * Created by ZEE on 4/5/14.
 */

app.directive('fkitem',function(ajax){
    return {
        restrict: 'E',
        //require: '^ngModel',
        scope: {
            ngModel: '='
        },
        template: "<span>{{ItemValue}}</span> ",//
        controller: ['$scope', 'ajax', function($scope, ajax) {
        //console.log('LinkedItem controller');
            $scope.Bind = function(routeEntity,id) {
                //console.log("in Bind for:"+routeEntity+","+id);
                ajax.Get(
                    {
                        route_entity: routeEntity,
                        id:id,
                        callback: function (res) {//Success or Failure?
                            //console.log(res);
                            if(res.result==='success')
                            {
                                $scope.ItemValue = res.data.data.data.name;
                            }
                            else
                            {
                                $scope.ItemValue="<b style='color:red;'>Record not found</b>";
                            }
                        }
                    }
                );

            }
        }],
        link: function(scope, iElement, iAttrs, ctrl) {
            console.log("fkitem directive invoked...");
            console.log(iAttrs);
            scope.Bind(iAttrs.route,iAttrs.param);
        }
    }

});