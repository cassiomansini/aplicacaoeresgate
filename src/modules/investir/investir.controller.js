InvestirController.$inject = ['InvestirService']

function InvestirController(InvestirService) {

  const vm = {}

  vm.$onInit = onInit

  function onInit() {
    obterAtivosParaInvestir()
  }

  function obterAtivosParaInvestir() {
    vm.loading = true
    vm.ativosParaInvestir = [];
    InvestirService.obterAtivosParaInvestir()
      .then(response => {
        vm.ativosParaInvestir = response;
      })
      .finally(() => { vm.loading = false })
  }

  return vm
}

export default InvestirController;