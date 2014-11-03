/**
 * Created by naveed on 5/14/14.
 */
/**
 * Created by naveed on 3/24/14.
 */

app.directive('hate',function(){
    return {
        restrict: 'E',
        /* require: '^ngModel',*/

        templateUrl: '/views/dform.html',
        controller: ['$scope','$rootScope', function($scope,$rootScope) {
            console.log('IFORM');
            $scope.data='';
            $scope.thisHideMe = false;
            $scope.toggle = function(){
                console.log($scope.thisHideMe);
                if($scope.thisHideMe){
                    $scope.thisHideMe = false;
                }else{
                    $scope.thisHideMe = true;
                }
            }
            $scope.isData=false;
            $scope.getBlur=function(data){

            if(data.length>0)
                $scope.isData=true;

            }
        }],
        link: function(scope, iElement, iAttrs, ctrl) {
            console.log(iAttrs);
            console.log(iElement);
            /* scope.init(iAttrs.route,iAttrs.filter);*/
        }
    };

});
