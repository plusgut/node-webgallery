App.controllers.Gallery = Em.ObjectController.extend({
  init: function(){
    App.on('showGallery', this, 'showGallery');
    App.on('hideGallery', this, 'hideGallery');
    this._super();
  },
  gallery: null,
  pictures: [],
  picturesLoaded: false,
  galleryObserver: function(){
    var gallery = this.get('gallery');
    if(gallery){
      var self = this;
      $.ajax('/pics/' + gallery).done(function(content){
        self.set('picturesLoaded', true);
        var parsedContent = self.serialize(JSON.parse(content));
        parsedContent.forEach(function(picture){
          Em.defineProperty(picture, 'path', App.helpers.index.path());
          Em.defineProperty(picture, 'thumb', App.helpers.index.path());
        });
        self.set('pictures', parsedContent);
      });
    }
  }.observes('gallery'),
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
  isVisible: false,
  showGallery: function(gallery){
    this.set('gallery', gallery);
    this.set('isVisible', true);
  },
  hideGallery: function(){
    this.set('isVisible', false);
  }
});
