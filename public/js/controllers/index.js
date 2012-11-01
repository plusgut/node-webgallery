App.controllers.Index = Em.ObjectController.extend({
  galleries: [],
  galleriesLoaded: false,
  init: function(){
    var self = this;
    $.ajax('/pics').done(function(content){
      self.set('galleriesLoaded', true);
      var parsedContent = self.serialize(JSON.parse(content));
      self.set('galleries', parsedContent);
    });
  },
  loadHandlebar: function(name, cb) {
    $.ajax('/js/views/' + name + '.handlebar').done(function(content){
      App.views[name].set('template', Em.Handlebars.compile(content)) 
    });
  },
  serialize: function(content){
    var newContent = Em.A();
    for(var contentIndex in content){
      if(content.hasOwnProperty(contentIndex)){
        newContent.pushObject(content[contentIndex]);
      }
    }

    return newContent;
  }
});
