module.exports = function(){

  this.Then(/^I should see a grid with a list of (\d+) features$/, function(count, callback) {
    this.browser
      .waitForElementPresent('#features-list .feature', 30000)
      .assertElementsEquals('#features-list .feature', 3)
      .then(callback);
  });

  this.Then(/^I should see a Create New Feature button$/, function(callback) {
    this.browser
      .assertElementPresent('.create-new-button')
      .then(callback)
  });

  this.When(/^I click the Create New Feature button$/, function(callback){
    this.browser
      .click('.create-new-button')
      .then(callback)
  });

  this.Then(/^I should see a new feature with name "([^"]*)"$/, function(feature_name, callback) {
    this.browser
      .assertElementPresent('#features-list .feature .feature-name:contains(' + feature_name + ')')
      .then(callback)
  });

  this.Then(/^each row of the grid should have an Edit button$/, function(callback) {
    this.browser
      .assertElementsEquals('#features-list .feature .feature-edit-button', 4)
      .then(callback)
  });

  this.When(/^I click on the Edit Button for a Feature$/, function(callback) {
    this.browser
      .click('#features-list .feature .feature-edit-button:first-child')
      .then(callback)
  });

  this.Then(/^I should see the edit menu$/, function(callback) {
    this.browser
      .assertVisible('input[name="editFeatureName"]')
      .then(callback)
  });


  this.Then(/^each row of the grid should have an Activate button$/, function(callback) {
    this.browser
      .assertElementsEquals('#features-list .feature .feature-activate-button', 3)
      .then(callback)
  });

  this.When(/^I click on the Disable button for a Feature$/, function(callback) {
    this.browser
      .waitForElementPresent('#features-list .feature', 30000)
      .click('#features-list .feature .feature-disable-button:first-child')
      .then(callback)
  });

  this.Then(/^the Feature should now have an Activate button$/, function(callback) {
    this.browser
      .pause(3000)
      .assertVisible('#features-list .feature .feature-activate-button:first-child')
      .then(callback)
  });

  this.When(/^I click on the Activate button for a Feature$/, function(callback) {
    this.browser
      .waitForElementPresent('#features-list .feature', 30000)
      .click('#features-list .feature .feature-activate-button:first-child')
      .then(callback)
  });

  this.Then(/^the Feature should now have a Disable button$/, function(callback) {
    this.browser
      .pause(3000)
      .assertVisible('#features-list .feature .feature-disable-button:first-child')
      .then(callback)
  });




  //#demo
//  this.Then(/^each row of the grid should have an Activate button$/, function(callback) {
//    this.browser
//      .assertElementsEquals('#features-list .feature .feature-activate-button', 3)
//      .then(callback)
//  });
//
//  this.When(/^I click on the Disable button for a Feature$/, function(callback) {
//    this.browser
//      .waitForElementPresent('#features-list .feature', 30000)
//      .click('#features-list .feature .feature-disable-button:first-child')
//      .then(callback)
//  });
//
//  this.Then(/^the Feature should now have an Activate button$/, function(callback) {
//    this.browser
//      .pause(3000)
//      .assertVisible('#features-list .feature .feature-activate-button:first-child')
//      .then(callback)
//  });
//
//  this.When(/^I click on the Activate button for a Feature$/, function(callback) {
//    this.browser
//      .waitForElementPresent('#features-list .feature', 30000)
//      .click('#features-list .feature .feature-activate-button:first-child')
//      .then(callback)
//  });
//
//  this.Then(/^the Feature should now have a Disable button$/, function(callback) {
//    this.browser
//      .pause(3000)
//      .assertVisible('#features-list .feature .feature-disable-button:first-child')
//      .then(callback)
//  });

}