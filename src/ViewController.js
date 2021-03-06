/*
The MIT License

Copyright (c) 2011 Shakti Ashirvad 
shakti.ashirvad@gmail.com
https://github.com/ashirvad

This file implements a ViewController interface.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the 
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit 
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the 
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE 
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
//A more elegant design is to make this guy also event listener. However my other project has a need to make this obj call out methods explicitly.
"use strict";
var ViewController = Object.create(Object.prototype, {
    _views: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: {}
    },
    register: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: function (viewName, viewObject) {
            if (!this._views[viewName] && !(viewObject instanceof Function)) {
                this._views[viewName] = viewObject;
                viewObject.addEventListener('focus', viewObject);
                viewObject.addEventListener('blur', viewObject);
            } else {
                this._views[viewName] = viewObject;
            }
        }
    },
    dispatchEventOnView: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: function (viewName, operation, auxData) {
            var view = this._views[viewName];
            if (view) {
                if (!(view instanceof Function)) {
                    if (!view.initialized && view.hasOwnProperty('init')) {
                        view.init();
                        view.initialized = true;
                    }
                    var cEvent = Object.create(CustomEvent);
                    cEvent.initEvent(operation, true);
                    cEvent.auxData = auxData;
                    view.dispatchEvent(cEvent);
                    //Returns if the event gets preventDefault()
                    return cEvent.returnValue;
                } else {
                    if (operation !== 'blur') {
                        view(auxData);
                    }
                    return true;
                } //IF Not instanceof Function
            } //IF View
        } //Function
    },
    getViewByName: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: function (viewName) {
            return this._views[viewName];
        }
    }
});