App.controllers.Index = Em.ObjectController.extend({
  loadHandlebar: function(name, cb) {
    $.ajax('/js/views/' + name + '.handlebar').done(function(content){
      App.views[name].set('template', Em.Handlebars.compile(content)) 
    });
  }
});
