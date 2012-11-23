App.controllers.container = Em.ObjectController.create({
  content: [],
  contentObserve: function(){
    var content = this.get('content');
    var template = '';
    content.forEach(function(module){
     template += '{{#if App.controllers.' + module.toLowerCase() + '.isVisible}}'; 
     template += '{{view App.views.' + module + '}}';
     template += '{{/if}}';
    });
    App.views.container.destroy();
    App.views.container = App.views.Container.create({template: Em.Handlebars.compile(template)}).append();
  }.observes('content.length'),
  init: function(){
    var views = [];
    for(var viewIndex in App.views){
      if(App.views.hasOwnProperty(viewIndex)){
        views.push(viewIndex);
      }
    }

    var self = this;

    async.forEach(views, function(module, cb){
      var moduleInstance = module.toLowerCase();
      if(!App.views[moduleInstance]){
        self.loadHandlebar(module, moduleInstance, function(module, moduleInstance, template){
          if(!App.controllers[moduleInstance]){
            App.controllers[moduleInstance] = App.controllers[module].create();
          }

          App.views[module] = App.views[module].extend({
            controller: App.controllers[moduleInstance], 
            template: Em.Handlebars.compile(template)
          })

          if(module != 'container'){
            self.get('content').pushObject(module);
          }
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
