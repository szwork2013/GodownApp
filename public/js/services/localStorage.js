'use strict';
app.factory('storageService', function () {

    var storage = {
        /*isLong : The value is Long if it is meant to be stored for long duration*/
        setItem: function (key, data, isLong) {
            var val = ((isLong != undefined) && (isLong == true));
            if (val) {
                window.localStorage.setItem(key, data);
            }
            window.sessionStorage.setItem(key, data);
        },

        getItem: function (key) {
            var value = window.sessionStorage.getItem(key);
            //if (_.isNull(value) || _.isUndefined(value)) {
            //    value = window.localStorage.getItem(key);
            //}
            return value === "undefined" ? null : value;//_.isNull(value) || _.isUndefined(value) || value === "undefined" ? null : JSON.parse(value);
        },

        removeItem: function (key) {
            window.sessionStorage.removeItem(key);
            window.localStorage.removeItem(key);
        },

        clearAll: function () {
            window.localStorage.clear();
            window.sessionStorage.clear();
        }
    };
    return storage;
});