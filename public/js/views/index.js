App.views.Index = Em.View.extend({
  init: function(){
    var self = this;
    this._super();
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
})
