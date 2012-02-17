/*
The MIT License

Copyright (c) 2011 Shakti Ashirvad 
shakti.ashirvad@gmail.com
https://github.com/ashirvad

Defines a skeliton of a view. A screen on application context. There are different ways views can be represented
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
var View = Object.create(EventListener, {
    element: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: null
    },
    _redraw: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: false
    },
    redraw: {
        configurable: true,
        enumerable: true,
        get: function(){
            return this._redraw;
        },
        set: function(val){
            if(val){
                this._redraw = true;
                if(this.timeout){
                    clearTimeout(this.timeout);
                    this.timeout = null;
                }
                var that = this;
                //Schedule a draw immediately
                this.timeout = setTimeout(function(){
                   that.draw(); 
                   that._redraw = false;
                   that.timeout = null;
                },0);
            }
        }
    },
    hasModal: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: false
    },
    initialized: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: false
    },
    draw: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: function () {
            //NOP
        }
    },
    reset: {
        value: function () {
            this.initialized = false;
            this.hasModal = false;
            this.redraw = false;
            this.element = null;
        }
    }
});