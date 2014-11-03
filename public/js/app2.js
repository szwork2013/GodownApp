'use strict';

//angular.module('meanChat', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route']);
var app = angular.module('zeesoft_wh', ['ngRoute', 'ngResource', 'ui.bootstrap',
    'toaster', 'chieffancypants.loadingBar','ngGrid','angularSpinner','jmdobry.angular-cache']);



app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when("/login", {
        controller: "userCtrl",
        templateUrl: "views/login.html"
    }).when('/', {
        controller: "userCtrl",
        templateUrl: "views/login.html"
    }).when('/home', {
        controller: "homeCtrl",
        templateUrl: "views/home.html"
    //OWNERS
    }).when('/owners', {
        controller: "listCtrl",
        templateUrl: "views/owner/owner-list.html",
        resolve: {
            route_entity: function(){
                return "owner";
            }
        }
    }).when('/owner/:id', {
        controller: "crudCtrl",
        templateUrl: "/views/owner/owner.html",
        resolve: {
            route_entity: function(){
                return "owner";
            }
        }
    }).when('/owner', {
        controller: "crudCtrl",
        templateUrl: "/views/owner/owner.html",
        resolve: {
            route_entity: function(){
                return "owner";
            }
        }
    //GODOWN
    }).when('/godowns', {
        templateUrl: "views/godown/godown-list.html",
        controller: "listCtrl",
            resolve: {
                route_entity: function(){
                    return "godown";
                }
            }
    }).when('/godown', {
        templateUrl: "/views/godown/godown.html",
        controller: "crudCtrl",
            resolve: {
                route_entity: function(){
                    return "godown";
                }
            }
    }).when('/godown/:id', {
        controller: "crudCtrl",
        templateUrl: "/views/godown/godown.html",
        resolve: {
            route_entity: function(){
                return "godown";
            }
        }
     //ROOM
     }).when('/rooms', {
        templateUrl: "views/room/room-list.html",
        controller: "listCtrl",
            resolve: {
                route_entity: function(){
                    return "room";
                }
            }
     }).when('/room', {
        templateUrl: "views/room/room.html",
        controller: "crudCtrl",
            resolve: {
                route_entity: function(){
                    return "room";
                }
            }
        }).when('/room/:id', {
            controller: "crudCtrl",
            templateUrl: "/views/room/room.html",
            resolve: {
                route_entity: function(){
                    return "room";
                }
            }
     //CUSTOMER
     }).when('/customer', {
        templateUrl: "views/customer/customer.html",
        controller: "crudCtrl",
            resolve: {
                route_entity: function(){
                    return "customer";
                }
            }
     }).when('/customers', {
        templateUrl: "views/customer/customer-list.html",
        controller: "listCtrl",
            resolve: {
                route_entity: function(){
                    return "customer";
                }
            }
        }).when('/customer/:id', {
            controller: "crudCtrl",
            templateUrl: "/views/customer/customer.html",
            resolve: {
                route_entity: function(){
                    return "customer";
                }
            }
     //AGREEMENT
     }).when('/agreements', {
        templateUrl: "views/agreement/agreement-list.html",
        controller: "listCtrl",
            resolve: {
                route_entity: function(){
                    return "agreement";
                }
            }
     }).when('/agreement', {
        templateUrl: "/views/agreement/agreement.html",
        controller: "crudCtrl",
            resolve: {
                route_entity: function(){
                    return "agreement";
                }
            }

        }).when('/agreement/:id', {
            controller: "crudCtrl",
            templateUrl: "/views/agreement/agreement.html",
            resolve: {
                route_entity: function(){
                    return "agreement";
                }
            }

    }).when('/coa',{

            controller:"treeCtrl",
            templateUrl:"/views/coa/coa.html"
        })
        .otherwise({ redirectTo: "/" });

});
//    .run(function ($rootScope, $location, storageService, $route) {
//
//        // register listener to watch route changes
//        $rootScope.$on("$routeChangeStart", function (event, next, current) {
//            var user = storageService.getItem("user");
//            if (user == null || user.isLogged == false) {
//                // no logged user, we should be going to #login
//                console.log(next.templateUrl);
//                //if (next.templateUrl == "../login.html" || next.templateUrl == "../register.html") {
//                    // already going to #login, no redirect needed
//                //} else {
//                    // not going to #login, we should redirect now
//                    $location.path("/login");
//                //}
//            }
//        });
//    });

app.run(function($rootScope){
    $rootScope.clickShow=true;
    $rootScope.myShow=function(ev){
        //alert(ev.which);
        if (ev.which==65)
        $rootScope.clickShow=!$rootScope.clickShow;

    }


})
app.directive('header', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'views/header.html'
    }
});
//Setting HTML5 Location Mode
//angular.module('zeesoft_wh').config(['$locationProvider',
  //  function($locationProvider) {
        //  $locationProvider.hashPrefix('!');
  //  }
//]);

