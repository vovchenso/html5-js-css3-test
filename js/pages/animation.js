"use strict";

APP.PAGES = APP.PAGES || {};

APP.PAGES.animation = (function() {
    
    var _init = function() {
        var cssBtn = APP.DOM.get('css3-btn');
        var canvasBtn = APP.DOM.get('canvas-btn');
        
        cssBtn.addEventListener('click', function() {
            this.classList.add('active');
            canvasBtn.classList.remove('active');
            
            _runCssAnimation();
        });
        
        canvasBtn.addEventListener('click', function() {
            this.classList.add('active');
            cssBtn.classList.remove('active');
            
            _runCanvasAnimation();
        });
    };
    
    var _runCssAnimation = function() {
        
    };
    
    var _runCanvasAnimation = function() {
        
    };
    
    return {
        init: function() {
            _init();
        }
    };
    
})();