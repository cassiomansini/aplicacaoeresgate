import angular from 'angular';
import MainCtrl from './main.controller';

export default angular.module('myApp.main', [])
  .controller('MainCtrl', MainCtrl)
  .name;
