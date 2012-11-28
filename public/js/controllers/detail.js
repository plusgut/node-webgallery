App.controllers.Detail = Em.ObjectController.extend({
  isVisible: false,
  gallery: null,
  picture: null,
  init: function(){
    App.helpers.detail = App.helpers.Detail.create();
    App.on('showPicture', this, 'showPicture');
    App.on('hidePicture', this, 'hidePicture');
    this._super();
  },
  pictureUrl: function(){
    return '/pics/' + this.get('gallery') + '/' + this.get('picture');
  }.property('gallery', 'picture'),
  galleryUrl: function(){
    return '#' + this.get('gallery');    
  }.property('gallery'),
  showPicture: function(gallery, picture){
    this.set('gallery', gallery);
    this.set('picture', picture); 
    App.trigger('pictureDidShow');
    this.set('isVisible', true);
  },
  hidePicture: function(){
    this.set('isVisible', false);
  }
});
