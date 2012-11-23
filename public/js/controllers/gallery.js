App.controllers.Gallery = Em.ObjectController.extend({
  gallery: null,
  isVisible: false,
  hashChanged: function(hash){
    this.set('gallery', hash);
    if(hash){
      this.set('isVisible', true);
    } else{
      this.set('isVisible', false);
    }
  }
});
