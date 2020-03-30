'use strict';

angular.
  module('core.bookService').
  service('BookService',BookService);

  function BookService($http){
    
    var url = 'http://localhost:3000/books';

    var service = {
      getBooks: getBooks,
      getBook: getBook,
    };

    return service;

    function getBooks() {
      return $http.get(url)
        .then(res =>{
          return res.data;
        });
    }
    
    function getBook(bookSlug) {
      return $http.get(url+'/'+bookSlug)
        .then(res =>{
          res.data.synopsis = res.data.synopsis.split("\n");
          return res.data;
        });
    }
  }