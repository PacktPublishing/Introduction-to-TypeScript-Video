var Jasmine: jasmine.JasmineStatic = require('jasmine');
var JasmineConsoleReporter: JasmineConsoleReporter.JasmineConsoleReporterStatic = require('jasmine-console-reporter');

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

//
// Ambient module declarations
//
declare module jasmine {

    interface JasmineStatic {
        new(): Jasmine;
    }

    class Jasmine {
        constructor();
        loadConfigFile(path: string): void;
        addReporter(reporter: jasmine.Reporter): void;
        execute(): void;
    }
}

//
// https://www.npmjs.com/package/jasmine-console-reporter
//
declare namespace JasmineConsoleReporter {

    export interface JasmineConsoleReporterStatic {
        new(options: JasmineConsoleReporterOptions): jasmine.Reporter;
    }
    
    interface JasmineConsoleReporterOptions {
        colors?: 0|1|2|boolean;
        cleanStack?: 0|1|2|3|boolean;
        verbosity?: 0|1|2|3|4|boolean;
        listStyle?: 'flat'|'indent';
        activity?: boolean;
    }
}