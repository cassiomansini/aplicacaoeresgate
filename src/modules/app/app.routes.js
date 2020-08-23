export default function routes($stateProvider) {
  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      template: require('./app.html'),
      controller: 'AppCtrl',
      controllerAs: 'vm',
      bindToController: true
    });
}
routes.$inject = ['$stateProvider'];