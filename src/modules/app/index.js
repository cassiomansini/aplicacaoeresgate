import angular from 'angular';
import routes from './app.routes';
import AppCtrl from './app.controller';

const AppModule = angular.module('myApp.app', ['ui.router'])
  .config(routes)
  .controller('AppCtrl', AppCtrl)

export default AppModule.name;