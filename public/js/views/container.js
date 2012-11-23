App.views.Container = Em.View.extend({
  template: Em.Handlebars.compile('Loading...')
});

App.views.container = App.views.Container.create().append();
