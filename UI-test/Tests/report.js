const HtmlReporter = require('nightwatch-html-reporter');

const reporter = new HtmlReporter({
  openBrowser: false,
  reportsDirectory: __dirname + '/../tests_output',
  themeName: 'default'
});

module.exports = reporter.fn;
