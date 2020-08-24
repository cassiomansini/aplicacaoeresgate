import angular from 'angular';
import ResgatarController from './resgatar.controller';
import ResgatarService from './resgatar.service';
import Routes from './resgatar.routes';

export default angular.module('myApp.resgatar', ['ui.router'])
  .config(Routes)
  .controller('ResgatarController', ResgatarController)
  .factory('ResgatarService', ResgatarService)
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