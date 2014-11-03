'use strict';
app.factory('ajax', function ($angularCacheFactory,http,$location) {
    var _api = {};
    var _cache = $angularCacheFactory('ajaxCachedResults',{
        // This cache can hold 1000 items
        capacity: 1000,
        // Items added to this cache expire after 15 minutes
        maxAge: 15 * 60000,
        // Items will be actively deleted when they expire
        deleteOnExpire: 'aggressive',
        // This cache will check for expired items every 5 minutes
        recycleFreq: 5 * 60000,
        // This cache will clear itself every hour
        cacheFlushInterval: 3600000,
        // This cache will sync itself with localStorage
        storageMode: 'localStorage',
        // Custom implementation of localStorage
        //storageImpl: myLocalStoragePolyfill,
        // Full synchronization with localStorage on every operation
        verifyIntegrity: true,
        // This callback is executed when the item specified by "key" expires.
        // At this point you could retrieve a fresh value for "key"
        // from the server and re-insert it into the cache.
        onExpire: function (key, value) {
            console.log(key+' expired. Reloading...');
            _api.Get({url:key,forceRefresh:true,callback:function(){
                if(key=="/whUser")
                alert("Session Expired! Please logout and sign in again.");
                $location.path("/login");
            }});
        }
    });

    var _get = function (options) {
        var _options={
           entity: options.route_entity,
           id:options.id,
           cache:options.cache||true,
           url:options.url||"/wh/"+options.route_entity+"/",
           forceRefresh:options.forceRefresh||false,
           callback:options.callback||function(cb_result){
               console.log(this.url+" response:");
               console.log(cb_result);
           }
        };
        if(options.id)//Get One
            _options.url=_options.url + _options.id;

        // console.log(_options);

        var cachedData=_cache.get(_options.url);
        if(_options.forceRefresh|| (!cachedData))
        http.get(_options.url).then(
            function (res) {//Success
                var _data={result:'success', data:res};
                if(_options.cache)
                _cache.put(_options.url,_data);
                //console.log('data cached:');
                //console.log(_data);
                _options.callback(_data);
            },
            function (res) {//Failure
                _options.callback({result:'failure', data:res});
            });
        else
        {
            //console.log('serving from cache:');
            //console.log(cachedData);
            _options.callback(cachedData);
        }

    };

    var _post = function (options) {
        var _options={
            entity: options.route_entity,
            data:options.data,
            cache:options.cache,
            url:options.url||"/wh/"+options.route_entity+"/",
            callback:options.callback||function(cb_result){
              //  console.log(this.url+" response:");
               // console.log(cb_result);
            }
        };
       // console.log(_options);
        //cache b4 sending
        if(_options.cache && _options.cache==='req')
            _cache.put(_options.url,_options.data);
        http.post(_options.url,_options.data).then(
            function (res) {//Success
                var _data={result:'success', data:res};
                if(_options.cache && _options.cache==='res')
                    _cache.put(_options.url,_data);
                _options.callback(_data);
            },
            function (res) {//Failure
                _options.callback({result:'failure', data:res});
        });
    };

    var _put = function (options) {
        var _options={
            entity: options.route_entity,
            data:options.data,
            url:options.url||"/wh/"+options.route_entity+"/",
            callback:options.callback||function(cb_result){
               // console.log(this.url+" response:");
               // console.log(cb_result);
            }
        };
       // console.log(_options);
        http.put(_options.url,_options.data).then(
            function (res) {//Success
                var _data={result:'success', data:res};
                _options.callback(_data);
            },
            function (res) {//Failure
                _options.callback({result:'failure', data:res});
            });
    };
    var _delete = function (options) {
        var _options={
            entity: options.route_entity,
            id:options.id,
            url:options.url||"/wh/"+options.route_entity+"/",
            callback:options.callback||function(cb_result){
              //  console.log(this.url+" response:");
               // console.log(cb_result);
            }
        };
        if(options.id)//Get One
            _options.url=_options.url + _options.id;

       // console.log(_options);
        http.delete(_options.url).then(
            function (res) {//Success
                var _data={result:'success', data:res};
                _options.callback(_data);
            },
            function (res) {//Failure
                _options.callback({result:'failure', data:res});
            });
    };

    _api.Get = _get;
    _api.Add= _post;
    _api.Update= _put;
    _api.Delete= _delete;

    return _api;
});