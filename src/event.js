/*
The MIT License

Copyright (c) 2011 Shakti Ashirvad 
shakti.ashirvad@gmail.com

This file implements a Javascript custom event class and event listener interface. 
Any object extending from these two objects will inherit the 

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
var CustomEvent = Object.create(Object.prototype, {
	type: {
		writable: true,
		configurable: true,
		enumerable: true,
		value: null
	},
	target: {
		writable: true,
		configurable: true,
		enumerable: true,
		value: null
	},
	cancelable: {
		writable: true,
		configurable: true,
		enumerable: true,
		value: false
	},
	timeStamp: {
		writable: true,
		configurable: true,
		enumerable: true,
		value: null
	},
	returnValue: {
		writable: true,
		configurable: true,
		enumerable: true,
		value: true
	},
	initEvent: {
		writable: true,
		configurable: true,
		enumerable: true,
		value: function (type, cancelable) {
			this.type = type;
			this.cancelable = cancelable;
			this.timeStamp = Date.now();
		}
	},
	preventDefault: {
		writable: true,
		configurable: true,
		enumerable: true,
		value: function () {
			if (this.cancelable) {
				this.returnValue = false;
			}
		}
	}
});
/*
 * EventListener interface. Every object need to extend this Object (Not its prototype) to be able to behave as a EventListener interface
 */
var EventListener = Object.create(Object.prototype, {
	eventHandlers: {
		writable: true,
		configurable: true,
		enumerable: true,
		value: null
	},
	addEventListener: {
		writable: true,
		configurable: true,
		enumerable: true,
		value: function (type, handler) {
			debugger;
			if (!this.eventHandlers) {
				this.eventHandlers = Object.create(null);
			}
			if (this.eventHandlers[type] === undefined) {
				this.eventHandlers[type] = []; //Doesnt work ??? Object.create(Array.prototype);
			}
			this.eventHandlers[type].push(handler);
		}
	},
	dispatchEvent: {
		writable: true,
		configurable: true,
		enumerable: true,
		value: function (customEvent) {
			debugger;
			customEvent.target = this;
			var type = customEvent.type;
			if (this.eventHandlers[type] !== undefined) {
				this.eventHandlers[type].forEach(function (eventOfType) {
					if (customEvent.returnValue) { //To check if someone has called preventDefault(), then dont execute.
						if (eventOfType.hasOwnProperty('handle' + type.charAt(0).toUpperCase() + type.substr(1))) {
							eventOfType['handle' + type.charAt(0).toUpperCase() + type.substr(1)].call(eventOfType, customEvent);
						} else if (eventOfType.hasOwnProperty('handleEvent')) {
							eventOfType.handleEvent(customEvent);
						} else if (eventOfType instanceof 'Function') {
							eventOfType(customEvent);
						}
					}
				});
				return customEvent.returnValue;
			}
		}
	},
	removeEventListener: {
		writable: true,
		configurable: true,
		enumerable: true,
		value: function (type, handler) {
			if (this.eventHandlers[type] !== undefined) {
				var tempHandlers = Object.create(Array.prototype);
				this.eventHandlers[type].forEach(function (currentHandler) {
					if (currentHandler !== handler) {
						tempHandlers.push(currentHandler);
					}
				});
				this.eventHandlers[type] = tempHandlers;
			}
		}
	}
});