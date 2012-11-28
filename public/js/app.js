Em.LOG_BINDINGS = true;

var App = Em.Application.create(Em.Evented, {
  init: function(){
    this.on('finished', this, 'finished');
    this._super();
  },
  hashChanged: function(){
    var hash = window.location.hash.substr(1);
    if(hash){
      var parts = hash.split('/');
      if(parts.length == 1 ){
        App.trigger('hidePicture');
        App.trigger('hideIndex');
        App.trigger('showGallery', parts[0]);
      } else if(parts.length == 2){
        App.trigger('hideGallery');
        App.trigger('hideIndex');
        App.trigger('showPicture', parts[0], parts[1]);
      } else{
        alert('404');
      }
    } else {
      App.trigger('hideGallery');
      App.trigger('hidePicture');
      App.trigger('showIndex');
    }
  },
  finished: function(){
    App.hashChanged();
  }
});


App.views       = {};
App.controllers = {};
App.models      = {};
App.helpers     = {};

$(window).bind('hashchange', App.hashChanged); 
