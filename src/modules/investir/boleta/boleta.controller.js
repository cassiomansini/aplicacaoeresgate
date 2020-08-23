import angular from 'angular'

InvestirController.$inject = ['$stateParams', '$mdToast', '$filter', 'InvestirService', 'moment']

function InvestirController($stateParams, $mdToast, $filter, InvestirService, moment) {

  const vm = {}

  vm.$onInit = onInit
  vm.boletar = boletar
  vm.excluirFinaisDeSemana = excluirFinaisDeSemana
  vm.calcularDatasCotLiq = calcularDatasCotLiq

  function onInit() {

    vm.request = {};

    vm.minDate = moment().toDate()
    vm.request.dataAplicacao = angular.copy(vm.minDate)
    calcularDatasCotLiq()

    if ($stateParams.ativo) {
      vm.ativo = $stateParams.ativo
    } else { obterAtivoParaInvestir($stateParams.id) }
  }

  function obterAtivoParaInvestir(id) {
    vm.loading = true
    vm.ativosParaInvestir = [];
    InvestirService.obterAtivoParaInvestir(id)
      .then(response => {
        vm.ativo = response;
      })
      .finally(() => { vm.loading = false })
  }

  function boletar() {

    if (!vm.request.termoRisco) {
      $mdToast.show(
        $mdToast.simple()
          .toastClass('error')
          .parent(document.querySelector('md-card.boleta'))
          .textContent('É necessário marcar declaração do termo de adesão e ciência de risco')
          .hideDelay(4500))

      return
    }

    if (vm.request.valor < vm.ativo.investimentoMinimo) {
      $mdToast.show(
        $mdToast.simple()
          .toastClass('error')
          .parent(document.querySelector('md-card.boleta'))
          .textContent(`Investimento mínimo não pode ser inferior a ${$filter('currency')(vm.ativo.investimentoMinimo)}`)
          .hideDelay(4500))

      return
    }

    vm.loadingBoleta = true;

    InvestirService.aplicar($stateParams.id, vm.request)
      .then(response => {
        vm.investimentoConcluido = response;
      })
      .finally(() => { vm.loadingBoleta = false })

  }

  function excluirFinaisDeSemana(date) {
    const day = date.getDay();
    return !(day === 0 || day === 6);
  }

  function calcularDatasCotLiq() {
    vm.dataCotizacao = moment(vm.request.dataAplicacao).add(1, 'days').toDate()
    vm.dataLiquidacao = moment(vm.request.dataAplicacao).add(3, 'days').toDate()
  }

  return vm
}

export default InvestirController;