(function(){

    /*
    * Lightweight JSONP fetcher
    * Copyright 2010-2012 Erik Karlsson. All rights reserved.
    * BSD licensed
    */


    /*
    * Usage:
    * 
    * JSONP.get( 'someUrl.php', {param1:'123', param2:'456'}, function(data){
    *   //do something with data, which is the JSON object you should retrieve from someUrl.php
    * });
    */
    var JSONP = (function(){
        var counter = 0, head, window = this, config = {};
        function load(url, pfnError) {
            var script = document.createElement('script'),
                done = false;
            script.src = url;
            script.async = true;
     
            var errorHandler = pfnError || config.error;
            if ( typeof errorHandler === 'function' ) {
                script.onerror = function(ex){
                    errorHandler({url: url, event: ex});
                };
            }
            
            script.onload = script.onreadystatechange = function() {
                if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                    done = true;
                    script.onload = script.onreadystatechange = null;
                    if ( script && script.parentNode ) {
                        script.parentNode.removeChild( script );
                    }
                }
            };
            
            if ( !head ) {
                head = document.getElementsByTagName('head')[0];
            }
            head.appendChild( script );
        }
        function encode(str) {
            return encodeURIComponent(str);
        }
        function jsonp(url, params, callback, callbackName) {
            var query = (url||'').indexOf('?') === -1 ? '?' : '&', key;
                    
            callbackName = (callbackName||config['callbackName']||'callback');
            var uniqueName = callbackName + "_json" + (++counter);
            
            params = params || {};
            for ( key in params ) {
                if ( params.hasOwnProperty(key) ) {
                    query += encode(key) + "=" + encode(params[key]) + "&";
                }
            }   
            
            window[ uniqueName ] = function(data){
                callback(data);
                try {
                    delete window[ uniqueName ];
                } catch (e) {}
                window[ uniqueName ] = null;
            };
     
            load(url + query + callbackName + '=' + uniqueName);
            return uniqueName;
        }
        function setDefaults(obj){
            config = obj;
        }
        return {
            get:jsonp,
            init:setDefaults
        };
    }());
    
    if (!w2c_obj) {
        return;
    }

    w2c_obj = {
        'token':w2c_obj
    };

    W2C_CLIENT = 'http://tools.alltel24.ru';

    function loadJsFile(filename){
      var fileref=document.createElement('script')
      fileref.setAttribute("type","text/javascript")
      fileref.setAttribute("src", filename)
      document.getElementsByTagName("head")[0].appendChild(fileref)
    }

    function loadCssFile(filename){
      var fileref=document.createElement("link")
      fileref.setAttribute("rel", "stylesheet")
      fileref.setAttribute("type", "text/css")
      fileref.setAttribute("href", filename)
      document.getElementsByTagName("head")[0].appendChild(fileref)
    }

    function loadApp(){
        loadJsFile('https://www.google.com/recaptcha/api.js');
        loadJsFile('web2call.js');
        loadCssFile('western.css');
    }

    // JSONP.init({
      // callbackName: 'w2c_jsonp',
    // });


    /* 
    * This will make a request for the url 
    * /test?otherParam1&param1=a&param2=b&callback=json{N}  where {N} is an auto incrementing counter
    * and then callback your function with the response.
    * Fourth parameter is if you want to override the "callback" named parameter. 
    */
    JSONP.get(W2C_CLIENT+'/api/web2call', {token:w2c_obj.token}, function(response){
        if (response != 'error'){
            w2c_obj['config'] = response;
            w2c_obj['config']['debug'] = true;
            w2c_obj['config']['work_time_from']= 25;
            w2c_obj['config']['work_time_to'] = 0;
            w2c_obj['config']['theme']['background-color'] ='#d50000'    
            loadApp();
        }
    });

})();

