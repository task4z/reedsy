'use strict';

// AngularJS E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Reedsy Application', function() {

  it('should redirect `index.html` to `index.html#!/books', function() {
    browser.get('index.html');
    expect(browser.getCurrentUrl()).toContain('index.html#!/books');
  });

  describe('View: Books list', function() {

    beforeEach(function() {
      browser.get('index.html#!/books');
    });

    it('should filter the book list as a user search', function() {
      let bookList = element.all(by.repeater('book in $ctrl.books'));
      let query = element(by.model('$ctrl.filter.searchField'));
      let pages = element.all(by.repeater('index in $ctrl.pageArray'));
      expect(bookList.count()).toBe(3);
      expect(pages.count()).toBe(4);
      query.sendKeys('lost');
      let searchButton = element(by.cssContainingText('.btn-warning', 'Search'));
      searchButton.click();
      expect(bookList.count()).toBe(2);
      expect(pages.count()).toBe(1);
      query.clear();
      query.sendKeys('d');
      searchButton.click();
      expect(bookList.count()).toBe(3);
      expect(pages.count()).toBe(4);
    });
    it('should change the page', function() {
      let getPagination = element.all(by.repeater('index in $ctrl.pageArray'));
      let selectedPage = element(by.css('li.page-item.active'));
      expect(selectedPage.getText()).toContain(1);
      getPagination.get(1).click();
      expect(selectedPage.getText()).toContain('2');

      let bookList = element.all(by.repeater('book in $ctrl.books'));
      let query = element(by.model('$ctrl.filter.searchField'));
      let pages = element.all(by.repeater('index in $ctrl.pageArray'));
      query.sendKeys('d');
      let searchButton = element(by.cssContainingText('.btn-warning', 'Search'));
      searchButton.click();
      expect(bookList.count()).toBe(3);
      expect(pages.count()).toBe(4);
    });
    it('should upvote the first book', function() {
      let upvoteButton = element.all(by.cssContainingText('.btn-warning', 'Upvote')).first();
      let upvotes = element.all(by.css('span.ml-3')).first();
      expect(upvotes.getText()).toContain('1111');
      upvoteButton.click();
      expect(upvotes.getText()).toContain('1112');
    });
    it('should not upvote the second book', function() {
      let upvoteButton = element.all(by.cssContainingText('.border-warning', 'Upvoted')).first();
      let upvotes = element.all(by.css('span.ml-3')).get(1);
      expect(upvotes.getText()).toContain('1022');
      upvoteButton.click();
      expect(upvotes.getText()).toContain('1022');
    });
    it('should change the url when click on image', function(){
      let firstImage = element.all(by.css('img.img-fluid')).first();
      expect(browser.getCurrentUrl()).toContain('index.html#!/books');
      firstImage.click();
      expect(browser.getCurrentUrl()).toContain('/#!/books/in-search-of-lost-time');
    })
  });

  describe('View: Book detail', function() {

    beforeEach(function() {
      browser.get('index.html#!/books/ulysses');
    });
    it('should display the `ulysses` page', function() {
      expect(element(by.binding('$ctrl.book.title')).getText()).toBe('Ulysses');
    });
    it('should display the book image', function() {
      let mainImage = element(by.css('img.img-fluid'));
      expect(mainImage.getAttribute('src')).toContain('images/03.jpg');
    });
    it('should upvote the book', function() {
      let upvoteButton = element(by.cssContainingText('.btn-warning', 'Upvote'));
      let upvotes = element.all(by.css('span.mr-3')).first();
      expect(upvotes.getText()).toContain('1003');
      upvoteButton.click();
      expect(upvotes.getText()).toContain('1004');
    });
    it('should comment the book', function() {
      let comments = element.all(by.repeater('comment in $ctrl.comments track by $index'));
      let rate = element(by.model('$ctrl.comment.rate'));
      let name = element(by.model('$ctrl.comment.name'));
      let comment = element(by.model('$ctrl.comment.comment'));
      expect(comments.count()).toBe(0);
      rate.sendKeys(2);
      let addCommentButton = element.all(by.cssContainingText('.btn', 'Submit Comment')).first();
      name.sendKeys('john doe');
      comment.sendKeys('no comments');
      addCommentButton.click();
      expect(rate.getText()).toEqual('');
      expect(comments.count()).toBe(1);
      let rateInRowZ = element.all(by.repeater('comment in $ctrl.comments track by $index').row(0).column('comment.rate')).first();
      let nameInRowZ = element.all(by.repeater('comment in $ctrl.comments track by $index').row(0).column('comment.name')).first();
      let commentInRowZ = element.all(by.repeater('comment in $ctrl.comments track by $index').row(0).column('comment.comment')).first();
      expect(rateInRowZ.getText()).toContain('2');
      expect(nameInRowZ.getText()).toContain('john doe');
      expect(commentInRowZ.getText()).toContain('no comments');
      rate.clear();
      rate.sendKeys(4);
      addCommentButton.click();
      expect(comments.count()).toBe(2);
      let nameInRowOne = element.all(by.repeater('comment in $ctrl.comments track by $index').row(1).column('comment.name')).first();
      let rateInRowOne = element.all(by.repeater('comment in $ctrl.comments track by $index').row(1).column('comment.rate')).first();
      expect(rateInRowOne.getText()).toContain('4');
      expect(nameInRowOne.getText()).toContain('Anonymous');
      rate.clear();
      addCommentButton.click();
      expect(comments.count()).toBe(2);
    });
  });

});
