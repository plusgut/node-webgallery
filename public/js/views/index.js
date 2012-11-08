App.views.index = Em.View.create({
  controller: App.controllers.Index.create(),
  init: function(){
    var self = this;
    this.controller.loadHandlebar('index', function(content){
      self.set('template', Em.Handlebars.compile(content));
    });
  },
}).appendTo('#application');

