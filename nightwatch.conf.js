module.exports = {
  src_folders: ["UI-test/Tests"],
  skip_testcases_on_fail: false,

  page_objects_path: ["UI-test/page-objects"],

  webdriver: {
    start_process: true,
    server_path: require('chromedriver').path,
    port: 4444
  },

  test_settings: {
    default: {
      launch_url: "http://automationpractice.multiformis.com",
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--headless", "--no-sandbox", "--disable-gpu"]
        }
      }
    }
  }
};
