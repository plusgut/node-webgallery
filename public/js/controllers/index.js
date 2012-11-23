App.controllers.Index = Em.Controller.extend({
  galleries: [],
  galleriesLoaded: false,
  isVisible: true,
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
    this._super();
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
    if(hash == ''){
      this.set('isVisible', true);
    } else{
      this.set('isVisible', false);
    }
  },
  active: true
});



