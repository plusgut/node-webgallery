App.views.index = Em.View.create({
  controller: App.controllers.Index.create(),
  init: function(){
    var self = this;
    this.controller.loadHandlebar('index', function(content){
      self.set('template', Em.Handlebars.compile(content));
    });
  },
  enterGallery: function(obj){
    var gal = "";
    if(obj.target.id){
      gal = obj.target.id;
    } else{
       gal = obj.target.parentNode.id;
    }

    location.hash = gal;
  },
}).appendTo('#application');

