'use strict';

describe('bookDetail tests', function() {

    beforeEach(module('bookDetail'));

  // Test the controller
    describe('bookDetailController', function() {
        let ctrl, $httpBackend;
        let comments = [];
        let book = {};
        let comment = {
            rate:'',
            name:'',
            dateComment: null,
            comment:'',
        };
        let mockBookData = {
            author: 'Miguel de Cervantes',
            cover: 'http://EPD9003:3000/images/02.jpg',
            rating: '9.8',
            slug: 'don-quixote',
            synopsis: 'Don Quixote is a middle-aged gentleman from the region of La Mancha',
            title: 'Don Quixote',
            upvoted: true,
            upvotes: 1022
        };
    beforeEach(inject(function($routeParams, _$httpBackend_, $componentController){
        $httpBackend = _$httpBackend_;
        $routeParams.bookSlug = 'don-quixote';
        $httpBackend.whenGET('http://localhost:3000/books/don-quixote').respond(mockBookData);
        ctrl = $componentController('bookDetail');
    }));
        it('should start empty book', function() {
            expect(ctrl.book).toBeDefined();
            expect(ctrl.book).toEqual(book);
        });
        it('should start empty array of comments', function() {
            expect(ctrl.comments).toBeDefined();
            expect(ctrl.comments).toEqual(comments);
        });
        it('should start empty comment with properties', function() {
            expect(ctrl.comment).toBeDefined();
            expect(ctrl.comment).toEqual(comment);
        });
        it('should change the value of property upvoted and add the number of upvotes', function(){
            ctrl.book = null;
            expect(ctrl.vote()).toEqual(undefined);
            ctrl.book = {
                upvoted: false,
                upvotes: 0,
            };
            ctrl.vote();
            expect(ctrl.book.upvoted).toEqual(true);
            expect(ctrl.book.upvotes).toEqual(1);
        });
        it('should add to comments and reset the variable comment', function(){
            ctrl.comment = {
                rate: null,
                name:'Anonymous',
                dateComment: new Date(),
                comment:'',
            };
            expect(ctrl.addComment()).toEqual(undefined);
            ctrl.comment = {
                rate: 2,
                name:'Anonymous',
                comment:'qwe',
            };
            let tmpComment = ctrl.comment;
            ctrl.addComment();
            tmpComment.dateComment = ctrl.comments[0].dateComment;
            expect(ctrl.comments[0]).toEqual(tmpComment);
            expect(ctrl.comment).toEqual(comment);
        });
        it('should run onInit and get Data from BookService', function() {
            ctrl.$onInit();
            expect(ctrl.book).toEqual({});
            $httpBackend.flush();
            expect(ctrl.book).not.toEqual(mockBookData);
            let mockBookDataTreated = {...mockBookData};
            mockBookDataTreated.synopsis = mockBookDataTreated.synopsis.split("\n");
            expect(ctrl.book).toEqual(mockBookDataTreated);
        });
    });
});
