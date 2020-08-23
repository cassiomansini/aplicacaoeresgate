export default ['$stateProvider', function routes($stateProvider) {
  $stateProvider
    .state('app.investir', {
      url: '/',
      abstract: true,
      template: "<main ui-view></main>"
    })
    .state('app.investir.listagem', {
      url: '',
      controller: 'InvestirController',
      controllerAs: 'vm',
      bindToController: true,
      templateProvider: ['$q', function ($q) {
        const deferred = $q.defer();
        require.ensure([], function () {
          deferred.resolve(require('./investir.html'));
        });
        return deferred.promise;
      }]
    })
    .state('app.investir.boleta', {
      url: 'investir/:id',
      params: {
        id: null,
        ativo: null
      },
      controller: 'InvestirBoletaController',
      controllerAs: 'vm',
      bindToController: true,
      templateProvider: ['$q', function ($q) {
        const deferred = $q.defer();
        require.ensure([], function () {
          deferred.resolve(require('./boleta/boleta.html'));
        });
        return deferred.promise;
      }]
    })
    ;
}];
