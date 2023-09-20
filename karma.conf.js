process.env.CHROME_BIN = require("puppeteer").executablePath();
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-chrome-launcher"),
      require("karma-jasmine"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
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

    reporters: ["progress", "coverage-istanbul", "mocha"],
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "./coverage"),
      reports: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true,
    },
  });
};
