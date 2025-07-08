module.exports = {
  src_folders: ["UI-test/Tests"],
  page_objects_path: ["UI-test/page-objects"],
  test_settings: {
    default: {
      launch_url: "http://automationpractice.multiformis.com",
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
