module.exports = function (container) {

    container.register('MongoFixtureLoaderModule', require('plus.garden.fixtures-mongo'));

    container.register('ApiModule', require('plus.garden.api'));

}