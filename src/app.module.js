import angular from 'angular';

import './app.style';

import AppModules from './modules';

const app = angular.module('myApp', [
  'angular-md5',
  'angularMoment',
  'angular.filter',
  'ngAnimate',
  'ngMaterial',
  'ngMessages',
  'ngSanitize',
  'ui.router',
  'ui.utils.masks',
  'smart-table',
  AppModules
]);

app.run(appRun);
app.config(appConfig);

appRun.$inject = ['$rootScope']
function appRun($rootScope) {

  $rootScope.online = navigator.onLine;

}

appConfig.$inject = ['$provide', '$locationProvider', '$mdThemingProvider', '$mdDateLocaleProvider', 'moment', '$urlRouterProvider']
function appConfig($provide, $locationProvider, $mdThemingProvider, $mdDateLocaleProvider, moment, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  moment.locale('pt-BR');

  $mdDateLocaleProvider.parseDate = dateString => moment(dateString, 'DD/MM/YYYY').toDate();
  $mdDateLocaleProvider.formatDate = date => moment(date).format('DD/MM/YYYY');

  const defaultRoute = 'app.investir.listagem'
  $urlRouterProvider.otherwise($injector => {
    $injector.invoke(['$state', $state => {
      $state.go(defaultRoute);
    }]);
  });

  const customLightBlueMap = $mdThemingProvider.extendPalette('light-blue', {
    '500': '#0072ce',
    'contrastLightColors': ['500', '600', '700', '800', '900', 'A400', 'A700']
  });

  const customGreenMap = $mdThemingProvider.extendPalette('green', {
    'A700': '#85bd00',
    'contrastLightColors': ['600', '700', '800', '900']
  });

  $mdThemingProvider.definePalette('customLightBlue', customLightBlueMap);
  $mdThemingProvider.definePalette('customGreen', customGreenMap);

  const themeList = {
    "lightTheme": {
      "primary": "customLightBlue",
      "accent": "customGreen",
      "primaryColorDefault": "700",
      "accentColorDefault": "A400"
    },
    "darkTheme": {
      "primary": "customLightBlue",
      "accent": "customGreen",
      "primaryColorDefault": "700",
      "accentColorDefault": "A400",
      "dark": true
    }
  };

  angular.forEach(themeList, (value, key) => {
    $mdThemingProvider
      .theme(key)
      .primaryPalette(value.primary, { 'default': value.primaryColorDefault })
      .accentPalette(value.accent, { 'default': value.accentColorDefault })
      .warnPalette('red')
      .backgroundPalette('grey', { 'default': '50' });

    if (value.dark) {
      $mdThemingProvider.theme(key).dark();
    }
  });

  $mdThemingProvider.alwaysWatchTheme(true);

  $provide.value('themeProvider', $mdThemingProvider);

}