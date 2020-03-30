'use strict';

angular.
  module('bookReedsyApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/books', {
          template: '<book-list></book-list>'
        }).
        when('/books/:bookSlug', {
          template: '<book-detail></book-detail>'
        }).
        otherwise('/books');
    }
  ]);
