'use strict';

describe('BookService', function() {
    let $httpBackend;
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
            cover: 'http://EPD9003:3000/dale',
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

    // Load the module that contains the `Book` service before each test
    beforeEach(module('core.bookService'));

    // Instantiate the service and "train" `$httpBackend` before each test
    beforeEach(inject(function(_$httpBackend_, _BookService_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET('http://localhost:3000/books').respond(mockBooksData);
        $httpBackend.whenGET('http://localhost:3000/books/don-quixote').respond(mockBookData);

        BookService = _BookService_;
    }));

    it('should fetch the books data from `http://localhost:3000/books`', function() {
        var books;
        BookService.getBooks().then(res => books = res);
        expect(books).toEqual(undefined);
        $httpBackend.flush();
        expect(books).toEqual(mockBooksData);
    });
    it('should fetch the books data from `http://localhost:3000/books/don-quixote`', function() {
        var book;
        BookService.getBook('don-quixote').then(res => book = res);
        expect(book).toEqual(undefined);
        $httpBackend.flush();
        let mockBookDataTreated = {...mockBookData};
        mockBookDataTreated.synopsis = mockBookDataTreated.synopsis.split("\n");
        expect(book).toEqual(mockBookDataTreated);
    });
});
