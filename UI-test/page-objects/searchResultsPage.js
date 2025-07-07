module.exports = {
  elements: {
    resultContainer: '#product_list', // Container for search results
    productTitles: '.product-name'   // Selector for product titles
  },

  commands: [{
    verifyResultsContain(searchTerm) {
      const selector = this.elements.productTitles.selector;// Get the selector for product titles

      
      this.api.elements('css selector', selector, result => {// Find all elements matching the selector
        if (!result.value || result.value.length === 0) {
          this.api.assert.ok(false, ' No search results found');
          return;
        }

        this.api.assert.ok(true, `Found ${result.value.length} results`); // Assert that results were found

        result.value.forEach((_, index) => { // Iterate over each result
          this.api.getText({ selector, index }, res => {
            const text = res.value?.trim() || '';
            console.log(' Product:', text);
            // Assert that the product title contains the search term 
            this.api.assert.ok(
              text.toLowerCase().includes(searchTerm.toLowerCase()), // Check if the product title contains the search term
              `Product "${text}" contains "${searchTerm}"` 
            );
          });
        });
      });

      return this; // Return the page object for chaining
    }
  }]
};
