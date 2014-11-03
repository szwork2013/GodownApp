/**
 * Created by naveed on 4/8/14.
 */

app.controller('treeCtrl', function ($scope, $timeout,http,ajax,toaster) {

    var id=1;
    $scope.json = '';
    $scope.data = {
        title:'Home',
        children: []
    };

    $scope.getJson = function () {
        $scope.json = angular.toJson($scope.data);
    };

    $scope.getJson = function () {
        $scope.json = angular.toJson($scope.data);
    };

    $scope.toggleMinimized = function (child) {
        child.minimized = !child.minimized;
    };

    $scope.addChild = function (child) {
        console.log(child);
        child.children.push({
            title: '',
            children: []
        });
    };

    $scope.remove = function (child) {
        function walk(target) {
            var children = target.children,
                i;
            if (children) {
                i = children.length;
                while (i--) {
                    if (children[i] === child) {
                        return children.splice(i, 1);
                    } else {
                        walk(children[i])
                    }
                }
            }
        }
        walk($scope.data);
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

    $scope.save=function(){


        /*ajax.Add(
            {
                route_entity: "tree",
                data: $scope.data,
                url:'/whs/tree/',
                callback: function (res) {
                    if(res.result==='success'){
                        toaster.pop('success', "New Record Creation", "Operation Successful!");
                     console.log('ADD SUCCESSFUL');

                    //    $location.path(PATH_LIST_VIEW);//list view page
                    } else {
                        if(res.data.status=="417")
                            toaster.pop('error', "Operation Failed", "Something went wrong while processing your request. Please contact admin.");
                        else
                            toaster.pop("error","Unknown Error Occurred:"+res.data.status);
                    }
                }
            }
        );*/

        getRefresh();

    };

    var root;
    function getRefresh()
    {
        ajax.Get({
            route_entity: "tree",
            cache:false,
            forceRefresh:true,
        url:'/whs/tree/',
            callback:function(cb_result){
                console.log(this.url+" response:");
              console.log(cb_result);
                var temp=cb_result.data.data.data;
               // console.log(Object.keys(temp[0]).indexOf("updated"));
                console.log(temp.length);

                for(var i=0;i<temp.length;i++)
                {
                    if(Object.keys(temp[0]).indexOf("parent_id")==-1)
                    {
                    root=temp[i];
                    root.children=[];
                   //   temp.splice(i,1);
                    break;
                    }

                }
                /*temp.forEach(function(value,index,array){
                   if(Object.keys(value).indexOf("parent_id")==-1)
                   {
                        root=value;
                       root.children=[];
                     //  temp.splice(index,1);
                        console.log(temp);
                   }



                });*/

              console.log(temp);
                console.log(temp.length);
                search(root,temp);
                console.log(root);
              //  $scope.data=cb_result;
            }



        });


    }

    var search=function(node,array)
    {
        console.log(array);
        console.log(node);

  /*var  children=    arrays.filter(function(element){

           return element.parent_id==node._id;

        });
    node.children=[];
    node.children=children;
       children.forEach(function(value,index,array){

           search(value,arrays);

       });
*/

        array.forEach(function(value,index,array){
            console.log("node")
            console.log(node);
            console.log(value);
            if( value.parent_id==node._id)
             {
                value.children=[];
                 node.children.push(value);
               //  array.splice(index,1);
                 search(value,array);
            }


        });
    }


});