App.views.index = Em.View.create({
  controller: App.controllers.Index.create(),
  init: function(){
    this.controller.loadHandlebar('index')
  },

}).appendTo('#application');

