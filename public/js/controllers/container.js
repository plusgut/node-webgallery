App.controllers.container = Em.ObjectController.create({
  init: function(){
    var views = [];
    for(var viewIndex in App.views){
      if(App.views.hasOwnProperty(viewIndex)){
        views.push(viewIndex);
      }
    }
    for(var viewIndex in views){
      if(views.hasOwnProperty(viewIndex)){
        var module = views[viewIndex];
        var moduleInstance = module.toLowerCase();
        if(!App.views[moduleInstance]){
         this.loadHandlebar(module, moduleInstance, function(module, moduleInstance, template){
            App.controllers[moduleInstance] = App.controllers[module].create();
            Em.TEMPLATES[moduleInstance] = Em.Handlebars.compile(template);
            App.views[moduleInstance] = App.views[module].create({
              controller: App.controllers[moduleInstance], 
              templateName: moduleInstance});
            App.views.container.get('childViews').pushObject(App.views[moduleInstance]);
          });
        }
      }
    }
  },
  loadHandlebar: function(module, moduleInstance, cb) {
    $.ajax('/js/views/' + moduleInstance + '.handlebar').done(function(content){
      cb(module, moduleInstance, content);
    });
  }
});
