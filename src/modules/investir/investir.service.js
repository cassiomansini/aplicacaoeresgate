investirService.$inject = ['$q', '$timeout']

function investirService($q, $timeout) {
  const service = {}

  service.obterAtivosParaInvestir = obterAtivosParaInvestir
  service.obterAtivoParaInvestir = obterAtivoParaInvestir
  service.aplicar = aplicar

  service.produtos = [
    {
      "id": "471888d0-33b3-432c-93f9-5b9c0b89355d",
      "nome": "ABSOLUTE HEDGE FIC FIM",
      "cnpj": "18860059000115",
      "investimentoMinimo": 5000.0,
      "rentabilidade12m": parseFloat(((Math.random() * 1) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1),
      "rentabilidade24m": parseFloat(((Math.random() * 6) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1),
      "rentabilidade36m": parseFloat(((Math.random() * 12) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1)
    },
    {
      "id": "471888d0-33b3-432c-93f9-5b9c0b89355d2",
      "nome": "ABSOLUTE HEDGE FIC FIM 2",
      "cnpj": "18860059000115",
      "investimentoMinimo": 10000.0,
      "rentabilidade12m": parseFloat(((Math.random() * 1) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1),
      "rentabilidade24m": parseFloat(((Math.random() * 6) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1),
      "rentabilidade36m": parseFloat(((Math.random() * 12) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1)
    },
    {
      "id": "471888d0-33b3-432c-93f9-5b9c0b89355d3",
      "nome": "ABSOLUTE HEDGE FIC FIM 3",
      "cnpj": "18860059000115",
      "investimentoMinimo": 1000.0,
      "rentabilidade12m": parseFloat(((Math.random() * 1) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1),
      "rentabilidade24m": parseFloat(((Math.random() * 6) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1),
      "rentabilidade36m": parseFloat(((Math.random() * 12) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1)
    },
    {
      "id": "bf8db97e-112a-41b9-a90a-ba443250ecd3",
      "nome": "ALASKA BLACK INSTITUCIONAL FIA",
      "cnpj": "26673556000132",
      "investimentoMinimo": 1000.0,
      "rentabilidade12m": parseFloat(((Math.random() * 1) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1),
      "rentabilidade24m": parseFloat(((Math.random() * 6) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1),
      "rentabilidade36m": parseFloat(((Math.random() * 12) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1)
    },
    {
      "id": "bf8db97e-112a-41b9-a90a-ba443250ecd32",
      "nome": "ALASKA BLACK INSTITUCIONAL FIA 2",
      "cnpj": "26673556000132",
      "investimentoMinimo": 5000.0,
      "rentabilidade12m": parseFloat(((Math.random() * 1) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1),
      "rentabilidade24m": parseFloat(((Math.random() * 6) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1),
      "rentabilidade36m": parseFloat(((Math.random() * 12) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1)
    },
    {
      "id": "bf8db97e-112a-41b9-a90a-ba443250ecd33",
      "nome": "ALASKA BLACK INSTITUCIONAL FIA 3",
      "cnpj": "26673556000132",
      "investimentoMinimo": 10000.0,
      "rentabilidade12m": parseFloat(((Math.random() * 1) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1),
      "rentabilidade24m": parseFloat(((Math.random() * 6) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1),
      "rentabilidade36m": parseFloat(((Math.random() * 12) + 1).toFixed(2)) * (Math.random() < 0.5 ? -1 : 1)
    }
  ]

  function obterAtivosParaInvestir() {
    const deferred = $q.defer();
    const promise = deferred.promise;

    $timeout(() => {
      deferred.resolve(service.produtos);
    }, (Math.floor(Math.random() * 5) + 1) * 1000)

    return promise;
  }

  function obterAtivoParaInvestir(id) {
    const deferred = $q.defer();
    const promise = deferred.promise;

    $timeout(() => {
      deferred.resolve(service.produtos.find(p => p.id === id));
    }, (Math.floor(Math.random() * 2) + 1) * 1000)

    return promise;
  }

  function aplicar(idAtivo, request) {
    console.log('idAtivo:', idAtivo)
    console.log('request:', request)

    const deferred = $q.defer();
    const promise = deferred.promise;

    $timeout(() => {
      deferred.resolve(true);
    }, (Math.floor(Math.random() * 15) + 1) * 1000)

    return promise;
  }

  return service;
}

export default investirService