App.controllers.container = Em.ObjectController.create({
  view: Em.View.create({
    template: Ember.Handlebars.compile('Loading.. ')
  }),
  content: [],
  init: function(){
    var views = [];
    for(var viewIndex in App.views){
      if(App.views.hasOwnProperty(viewIndex)){
        views.push(viewIndex);
      }
    }

    var childViews = [];
    var self = this;

    async.forEach(views, function(module, cb){
      var moduleInstance = module.toLowerCase();
      if(!App.views[moduleInstance] && moduleInstance != 'container'){
        self.loadHandlebar(module, moduleInstance, function(module, moduleInstance, template){
          App.controllers[moduleInstance] = App.controllers[module].create();

          App.views[module] = App.views[module].create({
            controller: App.controllers[moduleInstance], 
            template: Em.Handlebars.compile(template)
          }).append();          
          cb();
        });
      } else{
        cb();
      }
    }, function(err){
      console.log('done');
    });
    this._super();
  },
  loadHandlebar: function(module, moduleInstance, cb) {
    $.ajax('/js/views/' + moduleInstance + '.hjs').done(function(content){
      cb(module, moduleInstance, content);
    });
  }
});
