var Jasmine = require('jasmine');
var JasmineConsoleReporter = require('jasmine-console-reporter');
var j = new Jasmine();
j.loadConfigFile('spec/support/jasmine.json');
var reporter = new JasmineConsoleReporter({
    colors: 1,
    cleanStack: 1,
    verbosity: 4,
    listStyle: 'flat',
    activity: false
});
j.addReporter(reporter);
j.execute();
//# sourceMappingURL=index.js.map