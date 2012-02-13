/*
The MIT License

Copyright (c) 2011 Shakti Ashirvad 
shakti.ashirvad@gmail.com

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
var ViewController = Object.create(Object.prototype, {
	_views : {
		writable: true,
		configurable: true,
		enumerable: true,
		value: {}
	},
	registerView: {
		writable: true,
		configurable: true,
		enumerable: true,
		value: function(viewName, viewObject){
			if((!this._views[viewName]) && !(viewObject instanceof Function)) {
				this._views[viewName] = viewObject;
			}
		}
	},
	dispatchEventOnView: {
		writable: true,
		configurable: true,
		enumerable: true,
		value: function(viewName, operation, auxData){
			var view = this._views[viewName],
			    cEvent = new CustomEvent();
			cEvent.initEvent(operation, false);
			cEvent.auxData = auxData;
			
			if(view) {
				view.dispatchEvent(cEvent);
				if(view.redraw === true){ //Whats the trade off between this and setTieout ??
					view.draw();
					view.redraw = false;
				}
			}
		}
	},
});