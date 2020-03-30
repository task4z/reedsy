# André Alexandre Fermento Lourenço

Hi! I'm a Software developer with around 5 years experience in full stack applications.

Nowadays I work with Angular 8 and most of my tasks are on Front-End side.

## 1. About me

The most challenging project I had was for "Candor", now called "liqui.do".

When I moved to Lisbon I did a Single Page Application for the company.

The goal of that SPA was to offer a system for client companys, that could run on computers and smartphones, to do loans for other companys.

Clients could know the decision for the loan in minutes and do it in the moment by email or papper.

This project was the most challenging for me because until that time I didn't had experience with Angular neither any JavaScript framework since then I found one thing that I really loved to do....

## 2. General

##### 2.1. What kind of front end projects do you enjoy working on? Why?
- I preffer projects that are directed to commerce and not just internal use. That way I can add value to the life of more persons,
- I preffer projects where SCRUM is used, so the team is organized, transparent, and the delivery are iterative and incremental,
- I also preffer projects with wich I relate to.
##### 2.2. Which are your favorite features of HTML5? How have you used them before?

My favourite HTML5 features are:

- **header** and **footer** tag, this ones I used to set the header and footer of some projects. I did that way instead of the previous way to set two div's with the different id's (header and footer),
- the **placeholder** and the **required** attribute that I used in some input fields to help validate a form,
- the **localstorage** to save data in client-side so that credentials were saved in there and remembered when the user visit the site again.
##### 2.3. Explain the difference between creating a DOM element setting `innerHTML` and using `createElement`.
- `innerHTML` has an easier sintax since it is equal to the html elements, allthough it is easier to use, it requires more resources because it re-parse and recreate all the elements in the DOM so the previous references to elements does not work,
- `createElement` has a more difficult syntax but this one does not recreate all the page, just the elemet that we are creating, so previous references to elements remain.
`ìnnerHTML` is just better for example when we are in a cicle and we can add the elements after the cicle complete and `createElement`would need to create elements one by one at each iteration.
##### 2.4. Compare two-way data binding vs one-way data flow.
- **One way data binding** is when the model have the responsability to change the data and the changes made are shown in the UI so there is only one way to comunicate,
- **Two way data binding** is when a change occur in the UI the data model is update and when any change occur in the model the UI is updated.
When possible we should use one way data binding dispite that way is harder to read and undestand the code, we allways know the flow of the code and we don't have unnecessary bindings. 
More specifically two way data binding can create memory leaks specially in angularJS.
##### 2.5. Why is asynchronous programming important in JavaScript?
- In **Synchronous** programming the code run fro top to bottom and blocks on long network requests and disk I/O,
- In **Asynchronous** programming means that the engine runs in an event loop. When a blocking operation occur the code keep running without blocking the result so the UI keeps responding. When the response is ready a event handler run and the control flow continues. This way a single program can handle multiple concurrent operations.
## 3. Styling
If you don't have sass installed run 
```bash 
npm install -g sass 
```
```bash 
sass app.scss app.css
```
### Results: 
![q3-100p](./images/q3-100p.png "q3-100p")
![q3-50p.png](./images/q3-50p.png "q3-50p.png")
![q3-small](./images/q3-small.png "q3-small")![q3-small1](./images/q3-small1.png "q3-small1")

## 4. SPA
### To start the SPA
```bash 
npm start
```
Wich run the following commands:
```batch
npm install
cpx \"node_modules/{angular,angular-*,bootstrap/dist,jquery/dist}/**/*\" app/lib -C
http-server ./app -a localhost -p 8000 -c-1
```
#### Results: 
![spa-list-80](./images/spa-list-80.png "spa-list-80")
![spa-book-80](./images/spa-book-80.png "spa-book-80")
![spa-list-small](./images/spa-list-small.png "spa-list-small")![spa-book-small](./images/spa-book-small.png "spa-book-small")
![404](./images/404.png "404")
### To test the SPA
```bash 
npm test
```
Wich run the following commands:
```batch
npm install
cpx \"node_modules/{angular,angular-*,bootstrap/dist,jquery/dist}/**/*\" app/lib -C
karma start karma.conf.js
```
#### Results: 
![karmaResult](./images/karmaResult.png "karmaResult")
### To see the test coverage in the SPA
```bash 
npm test --code-coverage
```
Wich run the following commands:
```batch
npm install
cpx \"node_modules/{angular,angular-*,bootstrap/dist,jquery/dist}/**/*\" app/lib -C
karma start karma.conf.js --code-coverage
```
#### Results: 
![karmaFileCoverage](./images/karmaFileCoverage.png "karmaFileCoverage")
### To test the SPA e2e
```bash 
npm run protractor 
```
Wich run the following commands:
```batch
npm run update-webdriver
npm install
cpx "node_modules/{angular,angular-*,bootstrap/dist,jquery/dist}/**/*" app/lib -C
webdriver-manager update
protractor e2e-tests/protractor.conf.js
```
#### Results: 
![protractorResult](./images/protractorResult.png "protractorResult")