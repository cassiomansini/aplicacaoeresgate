import angular from 'angular'

ResgatarController.$inject = ['$mdDialog', '$mdToast', 'ResgatarService']

function ResgatarController($mdDialog, $mdToast, ResgatarService) {

  const vm = {}

  vm.$onInit = onInit
  vm.openModalResgate = openModalResgate

  function onInit() {
    obterPosicao()
  }

  function obterPosicao() {
    vm.loading = true
    vm.ativos = [];
    ResgatarService.obterPosicao()
      .then(response => {
        vm.ativos = response;
      })
      .finally(() => { vm.loading = false })
  }

  function openModalResgate(ev, ativo) {

    const modalResgate = {
      templateUrl: 'dialog_resgate.tmpl.html',
      controller: ['$scope', '$mdDialog', '$mdToast', 'moment', '$filter', 'ResgatarService', function ($scope, $mdDialog, $mdToast, moment, $filter, ResgatarService) {
        $scope.ativo = ativo

        $scope.cancel = () => { $mdDialog.cancel(); };

        $scope.excluirFinaisDeSemana = date => {
          const day = date.getDay();
          return !(day === 0 || day === 6);
        }

        $scope.calcularDatasCotLiq = () => {
          $scope.dataCotizacao = moment($scope.request.dataMovimentacao).add(1, 'days').toDate()
          $scope.dataLiquidacao = moment($scope.request.dataMovimentacao).add(3, 'days').toDate()
        }

        $scope.resgatar = () => {

          if ($scope.request.valorMovimentacao < $scope.ativo.movimentacaoMinima) {
            $mdToast.show(
              $mdToast.simple()
                .toastClass('error')
                .parent(document.querySelector('md-dialog[aria-label="Resgatar"]'))
                .textContent(`Valor mínimo de movimentação é de ${$filter('currency')($scope.ativo.movimentacaoMinima)}`)
                .hideDelay(4500))

            return
          } else if ($scope.ativo.valorBruto - $scope.request.valorMovimentacao !== 0 && $scope.ativo.valorBruto - $scope.request.valorMovimentacao < $scope.ativo.saldoMinimoPermanencia) {

            $mdToast.show(
              $mdToast.simple()
                .toastClass('error')
                .parent(document.querySelector('md-dialog[aria-label="Resgatar"]'))
                .textContent(`Saldo mínimo de permanência para ativo é de ${$filter('currency')($scope.ativo.saldoMinimoPermanencia)}`)
                .hideDelay(4500))

            return
          }

          const request = angular.copy($scope.request)
          request.tipoOperacao = 2;
          request.id = $scope.ativo.id;
          request.cpfCliente = "37444448302";

          $scope.loading = true;

          ResgatarService.resgatar(request)
            .then($mdDialog.hide)
            .catch(err => {
              $mdToast.show(
                $mdToast.simple()
                  .toastClass('error')
                  .parent(document.querySelector('md-dialog[aria-label="Resgatar"]'))
                  .textContent(err)
                  .hideDelay(4500))
            })
            .finally(() => { $scope.loading = false; })
        }

        $scope.minDate = moment('2020-10-20').toDate()
        $scope.request = {}
        $scope.request.dataMovimentacao = angular.copy($scope.minDate)
        $scope.resgateTotal = false
        $scope.calcularDatasCotLiq()

      }],
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: false,
      locals: {
        ativo: ativo
      }
    }

    $mdDialog.show(modalResgate)
      .then(() => {
        obterPosicao()
        $mdToast.show(
          $mdToast.simple()
            .toastClass('success')
            .parent(document.querySelector('md-dialog[aria-label="Resgatar"]'))
            .textContent('Resgate efetuado com sucesso')
            .hideDelay(4500))
      })

  }

  return vm
}

export default ResgatarController;