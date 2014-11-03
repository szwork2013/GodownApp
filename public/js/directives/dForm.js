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
        controller: function($scope,$rootScope,guid) {
            console.log('IFORM');
            $scope.data='';
            $scope.thisHideMe = false;
            $scope.record.owners=[];
            /*ownsers:[
                {id,code,name,coa_id}
            ]*/

            $scope.toggle = function(){
                console.log("in directive");
                if($scope.thisHideMe){
                    $scope.thisHideMe = false;
                }else{
                    $scope.thisHideMe = true;
                }
            }
            $scope.isData=false;
            $scope.isBlur=function(){
                $scope.getblurs();
              //  console.log("is blur");

            }

            $scope.reset = function() {

             return {
                 id: guid.New(),
                 code:'',
                 name:'',
                 coa_id:''
             }
                //$scope.user = angular.copy({});
            }
            $scope.getBlur=function(data){
            console.log("blur");
            var val= $scope.record.owners.filter(function(item){
                    return item.id==data.id;

                });


           console.log(val);
           if(val.length<1)
           $scope.record.owners.push(data);
           else
           {
               for(var key in data)
              val[key]=data[key];
           }

            }
        },
        link: function(scope, iElement, iAttrs, ctrl) {
            console.log(iAttrs);
            console.log(iElement);

            /* scope.init(iAttrs.route,iAttrs.filter);*/
        }
    };

});
