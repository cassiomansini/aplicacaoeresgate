import angular from 'angular';
import AppModule from './app';
import MainModule from './main';
import InvestirModule from './investir';
import ResgatarModule from './resgatar';

export default angular.module('myApp.appModules', [
  AppModule,
  MainModule,
  InvestirModule,
  ResgatarModule
]).name;