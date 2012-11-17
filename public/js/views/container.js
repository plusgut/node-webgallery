App.views.container = Em.ContainerView.extend({
  controller: App.controllers.container,
  childViews: [],
  init: function(){
    var self = this;
    this.controller.createChildViews(function(err, childViews){
      if(err){
        alert('Some weird error happened, while loading views');
      } else{
        self.set('childViews', childViews);
      }
    });
  }
});

