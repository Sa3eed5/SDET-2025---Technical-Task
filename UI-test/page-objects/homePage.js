module.exports = {
  url: 'http://automationpractice.multiformis.com/',// Base URL for the home page
  
  elements: {
    searchInput: 'input[name="search_query"]', // Selector for the search input field
    searchButton: 'button[name="submit_search"]' // Selector for the search button

  },
  commands: [{
    searchFor(term) { // Command to perform a search
      return this
        .waitForElementVisible('@searchInput', 5000)
        .clearValue('@searchInput')
        .setValue('@searchInput', term)
        .waitForElementVisible('@searchButton', 5000)
        .click('@searchButton');
    }
  }]
};
