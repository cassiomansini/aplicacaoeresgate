import angular from 'angular';
import InvestirController from './investir.controller';
import InvestirBoletaController from './boleta/boleta.controller';
import InvestirService from './investir.service';
import Routes from './investir.routes';

export default angular.module('myApp.investir', ['ui.router'])
  .config(Routes)
  .controller('InvestirController', InvestirController)
  .controller('InvestirBoletaController', InvestirBoletaController)
  .factory('InvestirService', InvestirService)
  .filter('cnpj', () => {
    return (input) => {
      let str = input + '';
      str = str.replace(/\D/g, '');
      str = str.replace(/^(\d{2})(\d)/, '$1.$2');
      str = str.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      str = str.replace(/\.(\d{3})(\d)/, '.$1/$2');
      str = str.replace(/(\d{4})(\d)/, '$1-$2');
      return str;
    }
  })
  .name;