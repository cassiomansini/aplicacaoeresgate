controller.$inject = ['$rootScope', '$window', 'moment']

function controller($rootScope, $window, moment) {

  if (!$window.sessionStorage.getItem('app-theme')) {
    $window.sessionStorage.setItem('app-theme', moment().hours() >= 17 ? 'darkTheme' : 'lightTheme')
  }

  $rootScope.theme = $window.sessionStorage.getItem('app-theme');

  $rootScope.toggleDarkMode = toggleDarkMode

  function toggleDarkMode() {
    $rootScope.theme = $rootScope.theme === 'lightTheme' ? 'darkTheme' : 'lightTheme';
    $window.sessionStorage.setItem('app-theme', $rootScope.theme)
  }
}

export default controller;

