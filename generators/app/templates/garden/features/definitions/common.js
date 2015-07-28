module.exports = function(){


    this.When(/^I make a GET request to "([^"]*)"$/, function(url, callback) {
        this.api.get(url).then(callback);
    });

    this.When(/^I make a PUT request to "([^"]*)"$/, function(url, callback) {
        this.api.put(url).then(callback);
    });

    this.When(/^I make a DELETE request to "([^"]*)"$/, function(url, callback) {
        this.api.del(url).then(callback);
    });

    this.When(/^I make a POST request to "([^"]*)"$/, function(url, callback) {
        this.api.post(url).then(callback);
    });

    this.Then(/^the status code should be (\d+)$/, function(statusCode, callback) {
        this.api.assertStatus(statusCode).then(callback);
    });

    this.Then(/^the status code should not be (\d+)$/, function(statusCode, callback) {
        this.api.assertStatusNot(statusCode).then(callback);
    });

    this.Then(/^content type should be "([^"]*)"$/, function(contentType, callback) {
        this.api.assertContentType(contentType).then(callback);
    });

    this.Then(/^the response should be:$/, function(string, callback) {
        this.api.assertJSON(JSON.parse(string)).then(callback);
    });


//    this.Then(/^I should see the following JSON error message:$/, function(string, callback) {
//        this.api.assertJSON({'code': 403, "message": string}).then(callback);
//    });

//    this.Then(/^I should see the following HTML error message:$/, function(string, callback) {
//        this.api.assertText('<!DOCTYPE html><HTML><BODY>' + string + '</BODY></HTML>').then(callback);
//    });

    this.Then(/^I should see the following body response contains: ([^"]*)$/, function(content, callback) {
        this.api.assertContains(content).then(callback);
    });

    this.Given(/^request headers:$/, function(table, callback) {
        this.api.addHeaders(table).then(callback);
    });

//    this.Given(/^form data:$/, function(table, callback) {
//        this.api.setBody(table).then(callback);
//    });

    this.Given(/^body of request:$/, function(body, callback) {
        this.api.setBody(body).then(callback);
    });

    this.Given(/^an empty request body$/, function(callback) {
      this.api.setBody("").then(callback);
    });

    this.Then(/^the response should be the following, taking into account that "([^"]*)" are dynamic fields$/, function(fields, exp_json, callback) {
        var fields = fields.split(',');
        this.api
            .modifyAndAssertJSON(function(actual_json, call){
                for (i=0; i < fields.length; i++) {
                    var field_name = fields[i];
                    actual_json[field_name] = "";
                }
                call(exp_json, actual_json);
            })
            .then(callback);
    });


//    this.Then(/^The header "([^"]*)" equals "([^"]*)"$/, function(name, value, callback) {
//        this.api.assertHeaderEquals(name, value).then(callback);
//    });
//
//    this.Then(/^The header "([^"]*)" doesn't exist$/, function(name, callback) {
//        this.api.assertHeaderNotExists(name).then(callback);
//    });






    this.Given(/^I am on "(.+)"/, function (url, callback) {
        this.browser.visit(url).then(callback);
    });

    this.Given(/^I am on external host "(.+)"/, function (url, callback) {
        this.browser.visitExternal(url).then(callback);
    });

    this.Given(/^I am on the homepage$/, function (callback) {
        this.browser.visit('/').then(callback);
    });

    this.Given(/^I fill in input with name "([^"]*)" with value "([^"]*)"$/, function(name, value, callback) {
      this.browser.setValue('input[name="' + name + '"]', value).then(callback);
    });

    this.Given(/^I should be on "([^"]*)" page$/, function(expectedTitle, callback) {
        this.browser.assertTitle(expectedTitle).then(callback);
    });

    this.Then(/^status code should be (\d+)$/, function(statuscode, callback) {
        this.browser.assertStatus(statuscode).then(callback);
    });

    this.Then(/^take screenshot$/, function (callback) {
        this.browser.saveScreenshot('.screen.png').then(callback)
    });

}