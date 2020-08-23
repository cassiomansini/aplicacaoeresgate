import angular from 'angular';
import ResgatarCtrl from './resgatar.controller';
import Routes from './resgatar.routes';

export default angular.module('myApp.resgatar', ['ui.router'])
  .config(Routes)
  .controller('ResgatarCtrl', ResgatarCtrl)
  .name;