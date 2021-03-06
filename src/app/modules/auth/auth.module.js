(function () {
    'use strict';

    angular
      .module('qorDash.auth', [
          'qorDash.auth.oauth',
          'qorDash.auth.permissions'
      ])
      .config(config)
      .run(run);

    function config($stateProvider, $httpProvider, $qorSidebarProvider) {
        $httpProvider.interceptors.push('authInterceptor');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/modules/auth/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('logout', {
                url: '/logout',
                controller: function ($state, user) {
                    user.logout();
                    $state.go('login');
                }
            });

        $qorSidebarProvider.config('logout', {
            title: 'Logout',
            nav: 20,
            content: '<span id="user-actions" ui-sref="logout" qor-sidebar-group-heading="Logout" data-icon-class="fa fa-sign-out"></span>'
        });
    }

    function run($rootScope, $state, user) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            // Go to login page if user is not authorized
            //if (toState.name!=='login' && !user.isAuthed()) {
            //    $state.transitionTo("login");
            //    event.preventDefault();
            //    return;
            //}
        });
    }
})();
