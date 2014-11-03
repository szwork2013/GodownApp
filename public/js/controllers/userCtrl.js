"use strict";
app.controller('userCtrl',
    function ($scope, $location, ajax, toaster,storageService) {

    var reset = function() {
        $scope.user = angular.copy({});
    };
    $scope.remember=storageService.getItem("remember");
    $scope.$watch("remember", function(newValue, oldValue) {
        if(newValue!=oldValue){
            storageService.setItem("remember", newValue,true);
        }
    });

	$scope.signin = function(user) {
        ajax.Add(
            {
                url: "/whUser",
             //   cache:$scope.remember?"res":null,//cache response json and give it back if req next time
                cache:"res",
                data: user,
                callback: function (res) {
                    if(res.result==='success'){
                        toaster.pop('success', "Logged In", "User Logged In successfully!");
                        $location.path('home');
                    } else {
                        if(res.data.status=="401")
                            toaster.pop("error","Invalid Credentials Specified!");
                        else
                            toaster.pop("error","Unknown Error Occurred:"+res.data.status);
                    }
                }
            }
        );
	};
   	$scope.showLastUser = function() {
        console.log($scope.remember);
        console.log($scope.remember=='true');

        if($scope.remember=='true'){
            console.log("getting user from cache"+$scope.remember);
          ajax.Get(
              {
                  url: "/whUser",
                  callback: function (res) {//Success or Failure?
                      if(res.result==='success'){
                          $scope.user = res.data.data.data;
                          console.log("user authenticated from cache:");
                          console.log($scope.user);
                          $scope.username = $scope.user.username;
                      }
                  }
              }
          );
        }
        else{
            reset();
        }
  	  };


//	$scope.isUnchanged = function(user) {
//	    return angular.equals(user, $scope.formCache);
//	};
 
//	$scope.showLastUser();
});
