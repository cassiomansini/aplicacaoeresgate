resgatarService.$inject = ['$q', '$timeout', '$window']

function resgatarService($q, $timeout, $window) {
  const service = {}

  service.obterPosicao = obterPosicao
  service.resgatar = resgatar

  service.produtos = [
    {
      "id": "471888d0-33b3-432c-93f9-5b9c0b89355d",
      "nome": "ABSOLUTE HEDGE FIC FIM",
      "valorBruto": parseFloat(((Math.random() * 70000) + 1).toFixed(2)) + 100,
      "saldoMinimoPermanencia": 100.0,
      "movimentacaoMinima": 100.0,
      "horarioCorte": "14:00:00",
      "podeResgatar": true
    },
    {
      "id": "bf8db97e-112a-41b9-a90a-ba443250ecd3",
      "nome": "ALASKA BLACK INSTITUCIONAL FIA",
      "valorBruto": parseFloat(((Math.random() * 200000) + 1).toFixed(2)) + 10000,
      "saldoMinimoPermanencia": 10000.0,
      "movimentacaoMinima": 100.0,
      "horarioCorte": "14:00:00",
      "podeResgatar": true
    },
    {
      "id": "bf8db97e-112a-41b9-a90a-ba443250ecd4",
      "nome": "ALASKA BLACK INSTITUCIONAL FIA II",
      "valorBruto": parseFloat(((Math.random() * 1000000) + 1).toFixed(2)) + 10000,
      "saldoMinimoPermanencia": 10000.0,
      "movimentacaoMinima": 100.0,
      "horarioCorte": "14:00:00",
      "podeResgatar": false
    }
  ]

  function obterPosicao() {
    const deferred = $q.defer();
    const promise = deferred.promise;

    if (!$window.sessionStorage.getItem('ativos-para-resgate') || !$window.sessionStorage.getItem('ativos-para-resgate').length) {
      $window.sessionStorage.setItem('ativos-para-resgate', JSON.stringify(service.produtos))
    }

    $timeout(() => {
      deferred.resolve(JSON.parse($window.sessionStorage.getItem('ativos-para-resgate')));
    }, (Math.floor(Math.random() * 3) + 1) * 1000)

    return promise;
  }

  function obterAtivoNaPosicao(id) {
    const deferred = $q.defer();
    const promise = deferred.promise;

    if (!$window.sessionStorage.getItem('ativos-para-resgate') || !$window.sessionStorage.getItem('ativos-para-resgate').length) {
      $window.sessionStorage.setItem('ativos-para-resgate', JSON.stringify(service.produtos))
    }

    $timeout(() => {
      deferred.resolve(JSON.parse($window.sessionStorage.getItem('ativos-para-resgate')).find(a => a.id === id));
    }, (Math.floor(Math.random() * 3) + 1) * 1000)

    return promise;
  }

  function resgatar(request) {
    const deferred = $q.defer();
    const promise = deferred.promise;

    obterAtivoNaPosicao(request.id)
      .then(ativo => {

        if (request.valorMovimentacao > ativo.valorBruto) {
          deferred.reject('O valor da movimentação é maior do que o valor disponível para resgate')
          return
        }

        ativo.valorBruto = ativo.valorBruto - request.valorMovimentacao;

        salvarNovaPosicao(ativo)

        deferred.resolve()
      })
      .catch(() => {
        deferred.reject('Ocorreu um erro ao buscar ativo para resgate em sua carteira')
      })

    return promise;
  }

  function salvarNovaPosicao(ativo) {
    const ativosPosicao = JSON.parse($window.sessionStorage.getItem('ativos-para-resgate')).filter(a => a.id !== ativo.id)

    if (ativo.valorBruto !== 0) {
      ativosPosicao.push(ativo)
    }

    $window.sessionStorage.setItem('ativos-para-resgate', JSON.stringify(ativosPosicao))
  }

  return service;
}

export default resgatarService