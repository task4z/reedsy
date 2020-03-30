'use strict';

// Register `bookList` component, along with its associated controller and template
angular.
  module('bookList').
  component('bookList', {
    templateUrl: 'book-list/book-list.template.html',
    controller: ['BookService', BookListController]    
  });

  function BookListController(BookService) {

    var vm = this;

    vm.$onInit = onInit;

    vm.pageSize = 3;
    vm.filter = {
      searchField: '',
      skip: 0,
      total: 0
    };
    vm.pageArray = [];
    vm.books = null;
    vm.booksOrdered = {};

    vm.vote = vote;
    vm.search = search;
    vm.searchEnter = searchEnter;
    vm.changePage = changePage;

    function onInit(){
      getBooksCall();
    }

    function getBooksCall(){
      BookService.getBooks()
        .then(res => treatData(res))
        .catch(err => err);
    }

    function treatData(res){
      if(!res){
        return;
      }
      vm.booksOrdered = res;
      vm.booksOrdered.books = vm.booksOrdered.books.sort((a, b) => b.rating - a.rating);
      vm.search();
    }

    function createPageArray(){
      let res = [];
      let cnt = 1;
      while(cnt <= Math.ceil(vm.filter.total/vm.pageSize)){
        res.push(cnt);
        cnt++;
      }
      return res;
    }

    function search(){
      changeBooks();
      vm.changePage(0);
    }

    function changeBooks(){
      vm.books = vm.booksOrdered.books.filter(b => 
        b.title.toLowerCase().indexOf(vm.filter.searchField.toLowerCase()) !== -1 
        || b.synopsis.toLowerCase().indexOf(vm.filter.searchField.toLowerCase()) !== -1);
      vm.filter.total = vm.books.length;
      vm.pageArray = createPageArray();
    }

    function searchEnter(keyEvent){
      if (keyEvent.which === 13){
        search();
      }
    }

    function changePage(pageNumber){
      if(vm.filter.searchField){
        changeBooks();
      }
      if(pageNumber >= 0 && pageNumber < Math.ceil(vm.filter.total/vm.pageSize)){
        let firstIndex = pageNumber*vm.pageSize;
        vm.books = vm.filter.total === vm.booksOrdered.books.length ? 
        vm.booksOrdered.books.slice(firstIndex,firstIndex+vm.pageSize) : 
        vm.books.slice(firstIndex,firstIndex+vm.pageSize);
        vm.filter.skip = pageNumber;
      }
    }

    //dispite not being required and not making sense without backend implementation I decided to implement this just on the front end side
    function vote(book){
      if(!book){
        return;
      }
      book.upvoted = true;
      book.upvotes++;
    }
  }