import angular from 'angular';
import routes from './app.routes';

const AppModule = angular.module('myApp.app', ['ui.router'])
  .config(routes)

export default AppModule.name;