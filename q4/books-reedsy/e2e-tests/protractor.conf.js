//jshint strict: false
exports.config = {


  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },
  chromeOnly: true,
  baseUrl: 'http://localhost:8000/',
  directConnect: true,

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
