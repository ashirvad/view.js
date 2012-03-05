view.js
=========
This project started with an idea to have a simple MVC based minimalistic framework which can help build a webapp fast.

What it has ?
---------------

### Events on Javascript Objects

A very important thing on MVC architecture is several screen controller talking to each other without knowing their internal functions or DOM. It can also be achieved using callbacks, but throwing events on itself and registered views acting on it is a good eligant architecture according to me.

### ECMA 5 syntax for Object based prototype inheritance

Every object is defined in ES5 syntax for its eligance and keeping future in mind. The typical inheritance of any screen Object is like this.

	Any Screen <- View Object <- EventListener object

Typically a new screen is defined as Object.create(View, { Map for the screen vars and functions});

### A ViewController Object

It has a global ViewController object that keeps track of registered views. It also registers two events 'focus' and 'blur' on each Views. Everytime a screen comes to focus, the handleFocus of that view is called. And everytime a screen goes out of focus by either bringing some other screen on top or exiting from the screen.

### An application Object

A global app context which is 'one ring to rule them all'. It will have ViewController as a member variable. Also it can employ certain functions like,

app.register('name-of-view', ViewObject);
app.show('name');
app.go(screen name);

etc...

More documentation will add once I start implementing this object.

### A view object

Every screen inherits from view object. There are several design patterns here. For example: 

1. Everytime the screen is created, init() method is called. Provided, the view implements init(). This is the right place for storing the DOM reference in the object. Creating member variabled and registering event handlers.

2. A this.redraw = true; eforces the framework to call draw() method. Developer is encouraged to write all dom modifications and style updating inside this function only. As infuture this function will be optimized.

3. hasModal property allows a screen to manage its modal state itself. And if a blur() event is sent when a modal exists. The app can do event.preventDefault() to not get thrown out of the view stack.