module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'lib/angular/angular.js',
      'lib/angular-route/angular-route.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '**/*.module.js',
      '*!(.module|.spec).js',
      '!(lib)/**/*!(.module|.spec).js',
      '**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      "karma-jasmine",
      "karma-coverage", //<-- using karma-coverage for code coverage
      "karma-chrome-launcher",
      "karma-phantomjs-launcher"
    ],
    // Coverage reporter generates the coverage
    reporters: ["progress", "coverage"],

    preprocessors: {
        "/**/!(*spec).js": ["coverage"] //<-- coverage pre-process
    },
    coverageReporter: {
      reporters:[
          { type: "html", dir: "./test/bin", subdir: "coverage/html" }
      ]
    },
    singleRun: true
  });
};
