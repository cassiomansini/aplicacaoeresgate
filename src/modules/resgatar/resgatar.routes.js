export default ['$stateProvider', function routes($stateProvider) {
  $stateProvider
    .state('app.resgatar', {
      url: '/resgatar',
      abstract: true,
      template: "<main ui-view></main>"
    })
    .state('app.resgatar.listagem', {
      url: '',
      controller: 'ResgatarController',
      controllerAs: 'vm',
      bindToController: true,
      templateProvider: ['$q', function ($q) {
        const deferred = $q.defer();
        require.ensure([], function () {
          deferred.resolve(require('./resgatar.html'));
        });
        return deferred.promise;
      }]
    })
    ;
}];
