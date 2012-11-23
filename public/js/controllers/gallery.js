App.controllers.Gallery = Em.ObjectController.extend({
  gallery: null,
  hashChanged: function(hash){
    this.set('gallery', hash);
  }
});
