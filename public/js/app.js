Em.LOG_BINDINGS = true;

var App = Em.Application.create();


App.views       = {};
App.controllers = {};
App.models      = {};
App.helpers     = {};

$(window).bind( 'hashchange', function(e) {
  var hash = window.location.hash.substr(1);
  for( var controllerIndex in App.controllers ){
    if(App.controllers.hasOwnProperty(controllerIndex) && App.controllers[controllerIndex].isInstance){
      if(App.controllers[controllerIndex].hashChanged){
        App.controllers[controllerIndex].hashChanged(hash);
      }
    }
  }
});

