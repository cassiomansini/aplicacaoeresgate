controller.$inject = ['$rootScope', 'moment']

function controller($rootScope, moment) {
  $rootScope.theme = moment().hours() >= 17 ? 'darkTheme' : 'lightTheme';
  $rootScope.toggleDarkMode = toggleDarkMode

  function toggleDarkMode() {
    $rootScope.theme = $rootScope.theme === 'lightTheme' ? 'darkTheme' : 'lightTheme';
  }
}

export default controller;

