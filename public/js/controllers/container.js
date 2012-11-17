App.controllers.container = Em.ObjectController.create({
  content: [],
  createChildViews: function(viewCb){
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
      if(!App.views[moduleInstance]){
        self.loadHandlebar(module, moduleInstance, function(module, moduleInstance, template){
          App.controllers[moduleInstance] = App.controllers[module].create();
          Em.TEMPLATES[moduleInstance] = Em.Handlebars.compile(template);
          App.views[moduleInstance] = App.views[module].create({
            controller: App.controllers[moduleInstance], 
            templateName: moduleInstance});
          childViews.push(App.views[moduleInstance]);
          cb();
        });
      } else{
        cb();
      }
    }, function(err){
      viewCb(err, childViews);
    });
  },
  loadHandlebar: function(module, moduleInstance, cb) {
    $.ajax('/js/views/' + moduleInstance + '.handlebar').done(function(content){
      cb(module, moduleInstance, content);
    });
  }
});
