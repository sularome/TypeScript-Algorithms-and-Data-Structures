module.exports = function(config) {
  var configuration = {
    basePath: '',
    customLaunchers: {
    },
    coverageReporter: {
        type : 'lcovonly',
        dir : 'coverage/',
        subdir: '.'
    },
    frameworks: ['jasmine', 'requirejs'],
    files: [
        {pattern: 'build/**/*.js', included: false},
        {pattern: 'tests/test-main.js'}

    ],
    exclude: [
    ],

    plugins: [
        'karma-coverage',
        'karma-requirejs',
        'karma-jasmine',
        'karma-jsdom-launcher'
    ],
    preprocessors: {
        './build/**/*.js': 'coverage'
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    browsers: ['jsdom'],
    singleRun: true,
    concurrency: Infinity
  };

  if (process.argv.indexOf('-w') >= 0) {
    configuration.singleRun = false;
    configuration.autoWatch = true;
  }

  config.set(configuration)
}
