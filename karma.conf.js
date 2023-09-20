process.env.CHROME_BIN = require("puppeteer").executablePath();
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-chrome-launcher"),
      require("karma-jasmine"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("karma-mocha-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],

    browsers: ["ChromeHeadless"],
    customLaunchers: {
      ChromeCi: {
        base: "ChromeHeadless",
        flags: [
          "--headless",
          "--disable-gpu",
          "--no-sandbox",
          "--disable-dev-shm-usage",
        ],
      },
    },

    reporters: ["progress", "coverage", "mocha"],
    preprocessors: {
      "src/app/**/*.js": ["coverage"],
    },
    coverageReporter: {
      type: "html",
      dir: "coverage/",
    },
  });
};
