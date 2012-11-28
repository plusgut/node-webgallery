App.controllers.Index = Em.Controller.extend({
  galleries: [],
  galleriesLoaded: false,
  isVisible: true,
  init: function(){
    App.on('showIndex', this, 'showIndex');
    App.on('hideIndex', this, 'hideIndex');
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
  showIndex: function(){
    this.set('isVisible', true);
  },
  hideIndex: function(){
    this.set('isVisible', false);
  }
});
