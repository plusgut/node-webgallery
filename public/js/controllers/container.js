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
          Em.TEMPLATES[moduleInstance] = Em.Handlebars.compile(template);
          App.views[module] = App.views[module].extend({
            controller: App.controllers[moduleInstance], 
            templateName: moduleInstance
          });          
          cb();
        });
      } else{
        cb();
      }
    }, function(err){
      var template = '';
      for(var viewIndex in views){
        if(views.hasOwnProperty(viewIndex)){
          var view = views[viewIndex];
          template += '{{view App.views.' + view + ' controller=App.controllers.' + view.toLowerCase() + '}}';
        }
      }

console.log(template)
      var container = Em.View.create({
        template: Ember.Handlebars.compile(template)
      });
      self.set('view', container);
    });
  },
  loadHandlebar: function(module, moduleInstance, cb) {
    $.ajax('/js/views/' + moduleInstance + '.handlebar').done(function(content){
      cb(module, moduleInstance, content);
    });
  }
});
