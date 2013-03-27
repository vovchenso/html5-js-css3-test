"use srtrict";

var APP = (function() {
    
    var _init = function() {
        _page();
    };
    
    var _page = function() {
        var hash = location.hash || '#common';
        
        var nav = APP.DOM.queryAll('header a');
        for (var elem in nav) {
            elem = nav[elem];
            if (elem.classList.contains('active')) {
                elem.classList.remove('active');
            }
            if (hash === elem.getAttribute('href')) {
                elem.classList.add('active');
            }
        }
        
        hash = hash.replace('#', '');
                
        APP.PAGE.load(hash, function(html) {
            var main = APP.DOM.get('main');
            main.innerHTML = html;
            main.className = hash;

            APP.PAGES[hash].init();
        });
    };
    
    return {
        GLOBALS: {},
        PAGES: {},
        run: function() {
            window.addEventListener('load', _init, false);
            window.addEventListener("hashchange", _page, false);
            return this;
        }
    };
    
})().run();

APP.STORAGE = (function() {

    function Storage(type) {
        switch (type) {
            case 'local': 
                this.storage = localStorage;
                break;
            case 'session':
                this.storage = sessionStorage;
                break;
            default:
                throw new Error('Storage type: ' + type + ' not implemented');
        }
    };
    Storage.prototype = {
        set: function(key, value, namespace) {
            namespace = namespace || '';
            this.storage.setItem(key, value);
        },
        get: function(key, namespace) {
            namespace = namespace || '';
            return this.storage.getItem(key);
        },
        remove: function(key, namespace) {
            namespace = namespace || '';
            this.storage.removeItem(key);
        },
        clear: function(namespace) {
            this.storage.clear();
        }
    };

    return {
        Local: new Storage('local'),
        Session: new Storage('session')
    };

})();

APP.DOM = (function() {
    
    var module = {
        get: (function(id) {
            var _cache = {};
            return function(id) {
                if (!(id in _cache)) {
                    _cache[id] = document.getElementById(id);
                }
                return _cache[id];
            }
        })(),
        queryAll: function(selector, parent) {
            var list = parent
                ? parent.querySelectorAll(selector)
                : document.querySelectorAll(selector);
                
            return Array.prototype.slice.call(list);
        },
        query: function(selector, parent) {
            if (parent) {
                return parent.querySelector(selector);
            }
            return document.querySelector(selector);
        }
    };
    
    return module;
    
})();

APP.PAGE = (function() {
    var _cache = {};
    
    var _load = function(name, callback) {
        var spinner = APP.DOM.get('spinner');        
        var httpRequest = new XMLHttpRequest();
        
        spinner.classList.remove('hidden');

        httpRequest.open('GET', 'pages/' + name + '.html');
        httpRequest.send();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    var response = httpRequest.responseText;
                    callback(response);
                }
                
                spinner.classList.add('hidden');
            }
        };
    };
    
    var module = {
        load: function(name, callback) {
            if (!(name in _cache)) {
                return _load(name, function(html) {
                    _cache[name] = html;
                    callback(_cache[name]);
                });
            }
            
            callback(_cache[name]);
        }
    };
    
    return module;
    
})();