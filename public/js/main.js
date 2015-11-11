angular
    .module('app', ['ngRoute', 'ngAnimate', 'common.exception', 'common.logger' ])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider
      .when('/', {
        templateUrl: 'app/feature/feature.html',
      })
      .when('/day/:id', {
        templateUrl: 'app/feature/feature.html',
        controller: "FeatureController",
        controllerAs: "vm"
      })
      .when('/me/:id', {
        templateUrl: 'app/submission/submission.html',
        controller: "SubmissionController",
        controllerAs: "vm"
      })
      .when('/form', {
        templateUrl: 'views/form.html',
        controller: 'FormController',
        controllerAs: 'form'
      })
      .otherwise({redirectTo: ''});

    }]);

(function() {
  'use strict';

  angular
    .module('app')
    .factory('appService', appService);

  appService.$inject = ['$http', '$routeParams', '$q'];

  function appService($http, $routeParams, $q) {

    var service = {
      getList: getList,
      getActive: getActive,
      readMine: readMine
    };
    return service;

    function getActive() {
      // body...

    }

    function isPersonal() {
      return $routeParams.id === undefined ? $q.when(false) : $q.when(true);
    }

    function getList() {
      return $http({
        method: 'GET',
        url: '/gifs/list',
        cache: true
      }).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        return data;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

    function readMine() {
      return $http({
        method: 'GET',
        url: '/gifs/mine/' + $routeParams.id,
      }).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        return data;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

  }
})();

(function() {
  'use strict';

  angular
    .module('app')
    .controller('FeatureController', FeatureController)

  FeatureController.$inject = ['appService', '$routeParams'];

  function FeatureController(appService, $routeParams) {
    var vm = this;
    vm.getList = getList;
    vm.supportingTemplate = "one";
    vm.isActive = isActive;
    vm.gifs = [];
    vm.selectedGif = undefined;
    vm.title = 'Avengers';

    activate();

    function activate() {
      return getList();
    }

    function getList() {
      return appService.getList()
        .then(function(data) {
          vm.gifs = data.data;
          console.log("hello");
          for (var i = 0; i < vm.gifs.length; i++) {
            console.log(vm.gifs[i].id + " and " + $routeParams.id);
            if(vm.gifs[i].id == $routeParams.id) {
              vm.selectedGif = vm.gifs[i];
            }
          }
        });
    }

    function isActive(avenger) {
      return !!(vm.selectedGif === avenger);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('app')
    .directive('supportingTemplate', supportingTemplate);

  supportingTemplate.$inject = ['$compile', 'featureService'];

  function myDirective() {
    return {
      templateUrl: function(elem, attr) {
        return '/app/feature/feature.' + attr.type + '.html';
      },
      restrict: "EAC"
    };
  }


  function supportingTemplate($compile, featureService) {
    return {
      scope: {
        vm: '=' // Two-way data binding,
          //TODO consider using a one-way binding here!
      },
      link: function(scope, element) {
        // Use the FeatureService to load in one of our directive templates
        featureService.getTemplate(scope.vm.supportingTemplate).then(function(response) {
          // Compile the template passing in scope, with the passed
          // scope access controller props using the parent as `vm.myVar`.
          element.append($compile(response.data)(scope));
        });
      }
    };
  }
})();

(function() {
  'use strict';

  angular
    .module('app')
    .factory('featureService', featureService);

  featureService.$inject = ["$http"];

  function featureService($http) {
    var service = {
      getTemplate: getTemplate
    };

    return service;

    function getTemplate(content) {
      return $http({
        method: 'GET',
        url: 'app/feature/feature.' + content + '.html',
        cache: true
      }).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        return data;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

  }
})();

(function() {
  'use strict';

  angular
    .module('app')
    .controller('PersonalController', PersonalController);

  PersonalController.$inject = ['appService', '$routeParams'];

  function PersonalController(appService, $routeParams) {
    var vm = this;
    vm.getList = getList;
    vm.isActive = isActive;
    vm.gifs = [];
    vm.selectedGif = undefined;
    vm.title = 'Avengers';

    activate();

    function activate() {
      return getList();
    }

    function getList() {
      return appService.getList()
        .then(function(data) {
          vm.gifs = data.data;
          console.log("hello");
          for (var i = 0; i < vm.gifs.length; i++) {
            console.log(vm.gifs[i].id + " and " + $routeParams.id);
            if(vm.gifs[i].id == $routeParams.id) {
              vm.selectedGif = vm.gifs[i];
            }
          }
        });
    }

    function isActive(avenger) {
      return !!(vm.selectedGif === avenger);
    }
  }
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('SubmissionController', SubmissionController);

    SubmissionController.$inject = ['appService'];

    function SubmissionController(appService) {
        var vm = this;

        vm.getList = getList;
        vm.isActive = isActive;
        vm.gifs = [];
        vm.selectedGif = undefined;
        vm.title = 'Avengers';

        activate();

        function activate() {
            return getList();
        }

        function getList() {
            return appService.getList()
                .then(function(data){
                    return vm.gifs = data.data;
                });
        }

        function isActive(avenger) {
            return !!(vm.selectedGif === avenger);
        }
    }
})();


(function () {
    'use strict';

    angular
        .module('app')
        .controller('GridController', GridController);

    GridController.$inject = ['appService'];

    function GridController(appService) {
        var vm = this;

        vm.getList = getList;
        vm.isActive = isActive;
        vm.gifs = [];
        vm.selectedGif = undefined;
        vm.title = 'Avengers';

        activate();

        function activate() {
            return getList();
        }

        function getList() {
            return appService.getList()
                .then(function(data){
                    return vm.gifs = data.data;
                });
        }

        function isActive(avenger) {
            return !!(vm.selectedGif === avenger);
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('common.exception')
        .provider('exceptionHandler', exceptionHandlerProvider)
        .config(config);

    /**
     * Must configure the exception handling
     * @return {[type]}
     */
    function exceptionHandlerProvider() {
        /* jshint validthis:true */
        this.config = {
            appErrorPrefix: undefined
        };

        this.configure = function (appErrorPrefix) {
            this.config.appErrorPrefix = appErrorPrefix;
        };

        this.$get = function() {
            return {config: this.config};
        };
    }

    /**
     * Configure by setting an optional string value for appErrorPrefix.
     * Accessible via config.appErrorPrefix (via config value).
     * @param  {[type]} $provide
     * @return {[type]}
     * @ngInject
     */
    function config($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    /**
     * Extend the $exceptionHandler service to also display a toast.
     * @param  {Object} $delegate
     * @param  {Object} exceptionHandler
     * @param  {Object} logger
     * @return {Function} the decorated $exceptionHandler service
     */
    function extendExceptionHandler($delegate, exceptionHandler, logger) {
        return function(exception, cause) {
            var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
            var errorData = {exception: exception, cause: cause};
            exception.message = appErrorPrefix + exception.message;
            $delegate(exception, cause);
            /**
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard. It is entirely up to you.
             * throw exception;
             *
             * @example
             *     throw { message: 'error message we added' };
             */
            logger.error(exception.message, errorData);
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('common.exception')
        .factory('exception', exception);

    /* @ngInject */
    function exception(logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function(reason) {
                logger.error(message, reason);
            };
        }
    }
})();

(function() {
    'use strict';

    angular.module('common.exception', ['common.logger']);
})();

(function() {
    'use strict';

    angular
        .module('common.logger')
        .factory('logger', logger);

    logger.$inject = ['$log'];

    function logger($log) {
        var service = {
            showToasts: true,

            error   : error,
            info    : info,
            success : success,
            warning : warning,

            // straight to console; bypass toastr
            log     : $log.log
        };

        return service;
        /////////////////////

        function error(message, data, title) {
            $log.error('Error: ' + message, data);
        }

        function info(message, data, title) {
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            $log.info('Success: ' + message, data);
        }

        function warning(message, data, title) {
            $log.warn('Warning: ' + message, data);
        }
    }
}());

(function() {
    'use strict';

    angular.module('common.logger', []);
})();

(function() {
    'use strict';

    angular
        .module('app')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    routehelper.$inject = ['$location', '$rootScope', '$route', 'logger', 'routehelperConfig'];

    // Must configure via the routehelperConfigProvider
    function routehelperConfig() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            // $routeProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    function routehelper($location, $rootScope, $route, logger, routehelperConfig) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        var $routeProvider = routehelperConfig.config.$routeProvider;

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            routeCounts: routeCounts
        };

        init();

        return service;
        ///////////////

        function configureRoutes(routes) {
            routes.forEach(function(route) {
                route.config.resolve =
                    angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
                $routeProvider.when(route.url, route.config);
            });
            $routeProvider.otherwise({redirectTo: '/'});
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError',
                function(event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    logger.warning(msg, [current]);
                    $location.path('/');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            updateDocTitle();
        }

        function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function(event, current, previous) {
                    routeCounts.changes++;
                    handlingRouteChangeError = false;
                    var title = routehelperConfig.config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title; // data bind to <title>
                }
            );
        }
    }
})();

(function() {
    'use strict';

    angular.module('app', [
        'ngRoute',
    ]);
})();
