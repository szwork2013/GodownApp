'use strict';
app.controller('headerCtrl', function ($scope,$rootScope, ajax,toaster, $route,$location,storageService) {

    $scope.currentView='';

    var main_menu={
            title: 'Maintenance',
            icon:'list',
            submenu:[]
        };

    var trans_menu={
        title: 'Transactions',
        icon:'edit',
        submenu:[
            {
                title: 'Bill',
                link: '/bill',
                icon:'list'
            },
            {
                title: 'Payment',
                link: '/payment',
                icon:'list'
            }
        ]
    };

    $scope.menu = [main_menu,trans_menu];
    var assignMenuOption=function(){
        main_menu.submenu.push({title: 'Company',link: '/companys',icon:'user'});
        main_menu.submenu.push({title: 'Godown',link: '/godowns',icon:'tower'});
        main_menu.submenu.push({title: 'Room',link: '/rooms',icon:'tower'});
        main_menu.submenu.push({title: 'Customer',link: '/customers',icon:'user'});
        main_menu.submenu.push({title: 'Agreements',link: '/agreements',icon:'user'});
        if($rootScope.user.name!=='admin')
        main_menu.submenu.push({title: 'Chart of Account',link: '/coa',icon:'list'});
    }

    $scope.isCollapsed = false;
//class="view-animate"
    function init() {
        ajax.Get(
            {
                url: "/whUser",
                callback: function (res) {//Success or Failure?
                    if(res.result==='success'){
                        $rootScope.user = res.data.data.data;
                        console.log("user authenticated from cache:");
                        console.log($scope.user);
                        $rootScope.username = $scope.user.username;
                        assignMenuOption();
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
    init();
    $scope.logout = function (record) {
        $location.path("/login");
    };
    
});