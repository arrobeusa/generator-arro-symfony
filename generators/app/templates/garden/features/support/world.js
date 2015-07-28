var Garden = require(require.resolve('plus.garden')).Garden;
var garden = new Garden().init();

var World = function World(callback) {

    var uze = require('cucumber.usesteps');
    uze.setRootDir(__dirname + '/../');

    this.config = garden.get('config');
    this.garden = garden;

    //Assertion
    this.chai = require('chai');
    this.should = this.chai.should();
    this.expect = this.chai.expect;
    this.assert = this.chai.assert;

    this.moment = require('moment');
    this.async = require('async');

    garden.get('Webdriver.Browser').create(function (browserService) {
        this.browserService = browserService;
        this.driver = browserService.driver;
        this.browser = browserService.browser;
        this.proxy = browserService.proxy;
        callback();
    }.bind(this));


    this.api = garden.get('ApiTester');
};

exports.World = World;
