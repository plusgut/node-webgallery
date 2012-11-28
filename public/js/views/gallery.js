App.views.Gallery = Em.View.extend({
  showPicture: function(event){
    var target = event.target;
    var picture = null;
    if(target.id){
      picture = target.id;
    } else {
      picture = target.parentNode.id;
    }

    window.location = '#' + this.get('controller').get('gallery') + '/' + picture;
  }
});
