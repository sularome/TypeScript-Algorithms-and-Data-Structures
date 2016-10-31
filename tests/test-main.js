var TEST_REGEXP = /^\/base\/build/i;
var allTestFiles = [];

Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    }
});

require.config({
    baseUrl: '/base',
    paths: {
    },
    shim: {
    },
    deps: allTestFiles,
    callback: window.__karma__.start
});