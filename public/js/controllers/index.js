App.controllers.Index = Em.ObjectController.extend({
  galleries: [],
  galleriesLoaded: false,
  tete: true,
  init: function(){
    App.helpers.index = App.helpers.Index.create();
    var self = this;
    $.ajax('/pics').done(function(content){
      self.set('galleriesLoaded', true);
      var parsedContent = self.serialize(JSON.parse(content));
      parsedContent.forEach(function(gallery){

        Em.defineProperty(gallery, 'path', App.helpers.index.path());
        Em.defineProperty(gallery, 'thumb', App.helpers.index.path());
      });
      self.set('galleries', parsedContent);
    });
  },
  serialize: function(content){
    var newContent = Em.A();
    for(var contentIndex in content){
      if(content.hasOwnProperty(contentIndex)){
        var emContent = Em.Object.create(content[contentIndex]);
        newContent.pushObject(emContent);
      }
    }
    return newContent;
  },
  hashChanged: function(hash){
    console.log('index: ' + hash);
  },
  active: true
});

