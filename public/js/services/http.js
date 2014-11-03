'use strict';
app.factory('http', function ($http) {

    var serviceFactory = {};

    var _get = function (url, request) {
        console.log("GET:"+url);
        return $http.get(url, request);
    };
    var _post = function (url, request) {
        console.log("POST"+url);
        console.log(request);
        return $http.post(url, request);
    };
    var _put = function (url, request) {
        console.log("PUT:"+url);
        console.log(request);
        return $http.put(url, request);
    };
    var _delete = function (url, request) {
        console.log("DELETE:"+url);
        return $http.delete(url, request);
    };

    serviceFactory.get = _get;
    serviceFactory.post = _post;
    serviceFactory.put = _put;
    serviceFactory.delete = _delete;

    return serviceFactory;
});