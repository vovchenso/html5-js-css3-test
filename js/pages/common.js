"use strict";

APP.PAGES = APP.PAGES || {};

APP.PAGES.common = (function() {
    
    var _createElements = function(number) {
        var div = document.createElement('div');
        div.className = 'item';        
        
        var content = APP.DOM.get('common-content');
        content.innerHTML = '';
        
        var el, i;
        for (i = 1; i <= number; i++) {
            el = div.cloneNode();
            el.innerHTML = '<span class="icon"></span>Test Item Element ' + i;
            content.appendChild(el);
        }
    };
    
    var _handlers = function() {
        APP.DOM.get('number').addEventListener('change', function() {
            APP.DOM.get('number-text').innerHTML = this.value;
            _createElements(this.value);
        });
        
        var btns = APP.DOM.queryAll('button.btn');
        for (var btn in btns) {
            btns[btn].addEventListener('click', function() {
                this.classList.toggle('active');
                
                var cls = this.getAttribute('data-class');
                var items = APP.DOM.queryAll('.item');
                for (var item in items) {
                    items[item].classList.toggle(cls);
                }
            });
        }
    };
    
    var _init = function() {
        _createElements(25);
    };
    
    var module = {
        init: function() {
            _init();
            _handlers();
        }
    };
    
    return module;
    
})();