Em.LOG_BINDINGS = true;

var App = Em.Application.create();


App.views       = {};
App.controllers = {};
App.models      = {};
App.helpers     = {};

$(window).bind( 'hashchange', function(e) {
  var hash = window.location.hash.substr(1);
  for( var viewIndex in App.views ){
    if(App.views.hasOwnProperty(viewIndex) && App.views[viewIndex].isInstance){
      if(App.views[viewIndex].controller.hashChanged){
        App.views[viewIndex].controller.hashChanged(hash);
      }
    }
  }
});

