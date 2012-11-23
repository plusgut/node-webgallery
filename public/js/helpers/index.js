App.helpers.Index = Em.ObjectController.extend({
  path: function(){
    return Em.computed('picture', function(key){
      var value = "";
      if(key == 'path'){
        value = 'pics/' + this.get('gallery') + '/' + this.get('picture');
      } else if(key == 'thumb'){
        value = 'thumbs/' + this.get('gallery') + '/100/100/' + this.get('picture');
      }
      return value;
    }).cacheable();
  }
});
