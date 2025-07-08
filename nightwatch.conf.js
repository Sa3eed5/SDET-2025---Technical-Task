module.exports = {
  src_folders: ["UI-test/Tests"],
  skip_testcases_on_fail: true,


  page_objects_path: ["UI-test/page-objects"],

  test_settings: {
    default: {
      launch_url: "http://automationpractice.multiformis.com",
      webdriver: {
        start_process: true,
        server_path: "",
        port: 4444
      },
      desiredCapabilities: {
        browserName: "chrome"
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--headless", "--no-sandbox", "--disable-gpu"]
        }
      }
    }
  }
};
