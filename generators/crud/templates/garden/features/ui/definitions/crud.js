module.exports = function(){

  this.Then(/^I should see a grid with a list of (\d+) <%= pluralResourceNameLower %>$/, function(count, callback) {
    this.browser
      .waitForElementPresent('#<%= pluralResourceNameLower %>-list .<%= resourceNameLower %>', 30000)
      .assertElementsEquals('#<%= pluralResourceNameLower %>-list .<%= resourceNameLower %>', 3)
      .then(callback);
  });

  this.Then(/^I should see a Create New <%= resourceName %> button$/, function(callback) {
    this.browser
      .assertElementPresent('.create-new-button')
      .then(callback)
  });

  this.When(/^I click the Create New <%= resourceName %> button$/, function(callback){
    this.browser
      .click('.create-new-button')
      .then(callback)
  });

  this.Then(/^I should see a new <%= resourceNameLower %> with name "([^"]*)"$/, function(<%= resourceNameLower %>_name, callback) {
    this.browser
      .assertElementPresent('#<%= pluralResourceNameLower %>-list .<%= resourceNameLower %> .<%= resourceNameLower %>-name:contains(' + <%= resourceNameLower %>_name + ')')
      .then(callback)
  });

  this.Then(/^each row of the grid should have an Edit button$/, function(callback) {
    this.browser
      .assertElementsEquals('#<%= pluralResourceNameLower %>-list .<%= resourceNameLower %> .<%= resourceNameLower %>-edit-button', 4)
      .then(callback)
  });

  this.When(/^I click on the Edit Button for a <%= resourceName %>$/, function(callback) {
    this.browser
      .click('#<%= pluralResourceNameLower %>-list .<%= resourceNameLower %> .<%= resourceNameLower %>-edit-button:first-child')
      .then(callback)
  });

  this.Then(/^I should see the edit menu$/, function(callback) {
    this.browser
      .assertVisible('input[name="edit<%= resourceName %>Name"]')
      .then(callback)
  });

}