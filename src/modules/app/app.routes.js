export default function routes($stateProvider) {
  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      template: require('./app.html')
    });
}
routes.$inject = ['$stateProvider'];