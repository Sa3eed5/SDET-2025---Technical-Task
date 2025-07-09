const path = require('path');
module.exports = {
  
  '@tags': ['contact', 'page-object'],

 beforeEach: function (browser) {
  const contact = browser.page.contactUsPage();
  contact
    .navigate()
    .waitForElementVisible('body', 10000)  
    .maximizeWindow()
    .pause(3000) 
    .waitForElementVisible('@sendButton', 5000);
},


  'TC1: Submit with all fields empty': function (browser) {
    const contact = browser.page.contactUsPage();
    contact.click('@sendButton')
      .waitForElementVisible('@errorAlert', 5000)
      .assert.containsText('@errorAlert', 'Invalid email address.')
      .pause(2000);
  },

  'TC2: Empty Subject Heading': function (browser) {
    const contact = browser.page.contactUsPage();
    contact.setValue('@subjectHeading', '')
      .setValue('@emailField', 'saied@gmail.com')
      .setValue('@orderRefField', '12345')
      .setValue('@messageBox', 'The size not fit.')
      .click('@sendButton')
      .waitForElementVisible('@errorAlert', 5000)
      .assert.containsText('@errorAlert', 'Please select a subject from the list provided.')
      .pause(2000);
  },

  'TC3: Empty Email Address': function (browser) {
    const contact = browser.page.contactUsPage();
    contact.setValue('@subjectHeading', '1')
      .setValue('@emailField', '')
      .setValue('@orderRefField', '12345')
      .setValue('@messageBox', 'The size not fit.')
      .click('@sendButton')
      .waitForElementVisible('@errorAlert', 5000)
      .assert.containsText('@errorAlert', 'Invalid email address.')
      .pause(2000);
  },

  'TC4: Empty Message Field': function (browser) {
    const contact = browser.page.contactUsPage();
    contact.click('@subjectHeading')
      .click('option[value="2"]')
      .setValue('@emailField', 'test@example.com')
      .setValue('@orderRefField', '12345')
      .setValue('@messageBox', '')
      .click('@sendButton')
      .waitForElementVisible('@errorAlert', 5000)
      .assert.containsText('@errorAlert', 'The message cannot be blank.')
      .pause(2000);
  },

  'TC5: Submit without optional fields': function (browser) {
    const contact = browser.page.contactUsPage();
    contact.click('@subjectHeading')
      .click('option[value="2"]')
      .setValue('@emailField', 'test@example.com')
      .setValue('@messageBox', 'The size not fit.')
      .click('@sendButton')
      .waitForElementVisible('@successAlert', 5000)
      .assert.containsText('@successAlert', 'Your message has been successfully sent')
      .pause(2000);
  },

  'TC6: Invalid Email Format': function (browser) {
    const contact = browser.page.contactUsPage();
    contact.click('@subjectHeading')
      .click('option[value="2"]')
      .setValue('@emailField', 'saied.com')
      .setValue('@orderRefField', '12345')
      .setValue('@messageBox', 'The size not fit.')
      .click('@sendButton')
      .waitForElementVisible('@errorAlert', 5000)
      .assert.containsText('@errorAlert', 'Invalid email address.')
      .pause(2000);
  },

  'TC7: Submit with valid data and file': function (browser) {
    const contact = browser.page.contactUsPage();
    const filePath = path.resolve(__dirname, './uploads/test.txt');
    contact.click('@subjectHeading')
      .click('option[value="2"]')
      .setValue('@emailField', 'saied@gmail.com')
      .setValue('@orderRefField', '12345')
      .setValue('@messageBox', 'The size not fit.')
      .setValue('@fileUpload', filePath)
      .click('@sendButton')
      .waitForElementVisible('@successAlert', 5000)
      .assert.containsText('@successAlert', 'Your message has been successfully sent')
      .pause(2000);
  },

  'TC8: Submit with unsupported file type': function (browser) {
    const contact = browser.page.contactUsPage();
    const filePath = path.resolve(__dirname, './uploads/test.xls');
    contact.click('@subjectHeading')
      .click('option[value="2"]')
      .setValue('@emailField', 'saied@gmial.com')
      .setValue('@orderRefField', '12345')
      .setValue('@messageBox', 'The size not fit.')
      .setValue('@fileUpload', filePath)
      .click('@sendButton')
      .waitForElementVisible('@errorAlert', 5000)
      .assert.containsText('@errorAlert', 'Bad file extension')
      .pause(2000);
  },
/*                 
  'TC9: Max Length Message': function (browser) {
    const contact = browser.page.contactUsPage();
    const longMsg = 'This is a test message.'.repeat(100);
    contact.click('@subjectHeading')
      .click('option[value="2"]')
      .setValue('@emailField', 'saied@gmail.com')
      .setValue('@orderRefField', '12345')
      .setValue('@messageBox', longMsg)
      .click('@sendButton')
      .waitForElementVisible('@errorAlert', 5000)
      .assert.containsText('@errorAlert', 'Please enter a message that is at most 1000 characters long.')
      .pause(2000);
  },

  'TC10: Min Length Message': function (browser) {
    const contact = browser.page.contactUsPage();
    contact.click('@subjectHeading')
      .click('option[value="2"]')
      .setValue('@emailField', 'saied@gmail.com')
      .setValue('@orderRefField', '12345')
      .setValue('@messageBox', 'Hi')
      .click('@sendButton')
      .waitForElementVisible('@errorAlert', 5000)
      .assert.containsText('@errorAlert', 'Please enter a message that is at least 10 characters long.')
      .pause(2000);
     
  }, */
  'TC11: Verify functionality of Send Button': function (browser) {
    const contact = browser.page.contactUsPage();
    contact.click('@subjectHeading')
      .click('option[value="2"]')
      .setValue('@emailField', 'SAIED@gmail.com')
      .setValue('@orderRefField', '12345')
      .setValue('@messageBox', 'The size not fit.')
      .click('@sendButton')
      .waitForElementVisible('@successAlert', 5000)
      .assert.containsText('@successAlert', 'Your message has been successfully sent')
      .pause(2000);
  },
  // Verify that the search functionality works correctly
  // 'Search for "dress" and verify results': function (browser) {
  //   const homePage = browser.page.homePage();
  //   const resultsPage = browser.page.searchResultsPage(); // Page object for search results
  //   homePage.navigate();
  //   homePage.searchFor('dress');
  //   resultsPage.waitForElementVisible('@resultContainer', 5000);// Wait for the results container to be visible
  //   resultsPage.verifyResultsContain('dress');// Verify that results contain the search term 'dress'

  // },

  after: function (browser) {
    browser.pause(5000);
    // Close the browser after all tests
    browser.end();
  }
};
