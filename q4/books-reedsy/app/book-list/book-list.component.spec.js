'use strict';

describe('bookList tests', function() {

    // Load the module that contains the `bookList` component before each test
    beforeEach(module('bookList'));

    // Test the controller
    describe('bookListController', function() {
        var $httpBackend, ctrl;
        let mockBooksData = {
            books: [{
                author: 'Miguel de Cervantes',
                cover: 'http://EPD9003:3000/images/02.jpg',
                rating: '9.8',
                slug: 'don-quixote',
                synopsis: 'Don Quixote is a middle-aged gentleman from the region of La Mancha',
                title: 'Don Quixote',
                upvoted: true,
                upvotes: 1022
            },
            {
                author: 'Chris Voss',
                cover: 'http://EPD9003:3000/difference',
                rating: '10',
                slug: 'never-split-the-difference',
                synopsis: 'After a stint policing the rough streets of Kansas City, Missouri, Chris Voss joined the FBI, where his career as a hostage negotiator brought him face-to-face with a range of criminals.',
                title: 'Never Split the Difference',
                upvoted: true,
                upvotes: 1022
            }],
            meta: { 
                count: 2
            }
        };

        beforeEach(inject(function($componentController, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('http://localhost:3000/books').respond(mockBooksData);
        ctrl = $componentController('bookList');
        }));

        it('should start variable pageSize with value 3', function() {
            expect(ctrl.pageSize).toBeDefined();
            expect(ctrl.pageSize).toEqual(3);
        });
        it('should start variable filter with empty searchField string property, skip property equas 0 and total equals 0', function() {
            expect(ctrl.filter).toBeDefined();
            expect(ctrl.filter).toEqual({searchField: '',skip: 0,total: 0});
        });
        it('should start variable pageArray as an empty array', function() {
            expect(ctrl.pageArray).toBeDefined();
            expect(ctrl.pageArray).toEqual([]);
        });
        it('should start variable books as null', function() {
            expect(ctrl.books).toBeDefined();
            expect(ctrl.books).toBeNull();
        });
        it('should start variable booksOrdered as empty object', function() {
            expect(ctrl.booksOrdered).toBeDefined();
            expect(ctrl.booksOrdered).toEqual({});
        });
        it('should change the value of property upvoted and add the number of upvotes', function(){
            ctrl.book = null;
            expect(ctrl.vote()).toEqual(undefined);
            ctrl.book = {
                upvoted: false,
                upvotes: 0,
            };
            ctrl.vote(ctrl.book);
            expect(ctrl.book.upvoted).toEqual(true);
            expect(ctrl.book.upvotes).toEqual(1);
        });
        it('should call onInit method and get books data', function() {

            ctrl.$onInit();
            expect(ctrl.books).toBeNull();
            $httpBackend.flush();

            // treatData
            let mockBooksDataOrdered = {...mockBooksData};
            mockBooksDataOrdered.books = mockBooksDataOrdered.books.sort((a, b) => b.rating - a.rating);
            expect(ctrl.booksOrdered).toEqual(mockBooksDataOrdered);

            //changeBooks no filter
            expect(ctrl.books).toEqual(mockBooksDataOrdered.books);
            expect(ctrl.filter.total).toEqual(mockBooksDataOrdered.books.length);
            
            //createPageArray
            expect(ctrl.pageArray).not.toEqual([1,2]);
            expect(ctrl.pageArray).toEqual([1]);

            // changePage(0)
            expect(ctrl.filter.skip).toEqual(0);
            expect(ctrl.books).toEqual(mockBooksDataOrdered.books);
        });
        it('go to page one and search', function() {
            ctrl.pageSize = 1;
            ctrl.$onInit();
            expect(ctrl.books).toBeNull();
            $httpBackend.flush();
            let mockBooksDataOrdered = {...mockBooksData};
            mockBooksDataOrdered.books = mockBooksDataOrdered.books.sort((a, b) => b.rating - a.rating);
            let bookZero = mockBooksDataOrdered.books[0];
            let bookOne = mockBooksDataOrdered.books[1];
            ctrl.changePage(1);
            expect(ctrl.filter.skip).toEqual(1);
            expect(ctrl.books).toEqual([bookOne]);
            ctrl.filter.searchField = 'difference';
            ctrl.search();
            expect(ctrl.books).toEqual([bookZero]);
            expect(ctrl.filter.skip).toEqual(0);
            expect(ctrl.pageArray.length).toEqual(1);
            ctrl.filter.searchField = '';
            ctrl.search();
            expect(ctrl.pageArray.length).toEqual(2);
        });
    });


});
