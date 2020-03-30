'use strict';

// Register `bookDetail` component, along with its associated controller and template
angular.
  module('bookDetail').
  component('bookDetail', {
    templateUrl: 'book-detail/book-detail.template.html',
    controller: ['$routeParams', 'BookService', BookDetailController]
  });

  function BookDetailController($routeParams, BookService) {
    var vm = this;
    
    vm.$onInit = onInit;
    vm.vote = vote;
    vm.addComment = addComment;

    vm.comments = [];
    vm.book = {};
    vm.comment = {
      rate:'',
      name:'',
      dateComment: null,
      comment:'',
    };

    function onInit(){
      getBookDetails();
    }

    function getBookDetails(){
      BookService.getBook($routeParams.bookSlug)
      .then(res => vm.book = res)
      .catch(err => vm.error = err);
    }

    function vote(){
      if(!vm.book){
        return;
      }
      vm.book.upvoted = true;
      vm.book.upvotes++;
    }

    function addComment(){
      if(vm.comment.rate < 1 || vm.comment.rate > 10 || !vm.comment.rate ){
        return;
      }
      vm.comment.rate = vm.comment.rate;
      vm.comment.dateComment = new Date();
      vm.comment.name = vm.comment.name ? vm.comment.name : 'Anonymous';
      vm.comment.comment = vm.comment.comment ? vm.comment.comment : ''; 
      vm.comments.push(vm.comment);
      resetComment();
    }

    function resetComment(){
      vm.comment = {
        rate:'',
        name:'',
        dateComment: null,
        comment:'',
      };
    }
  }
