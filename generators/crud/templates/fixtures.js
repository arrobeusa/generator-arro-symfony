var id = require('pow-mongodb-fixtures').createObjectId;

var <%= pluralResourceNameLower %> = exports.<%= resourceName %> = {

<%= resourceNameLower %>1: {
    _id: id('5467ab88e8a2582108000000'),
    name: 'A really cool new <%= resourceName %> '
  },
  <%= resourceNameLower %>2: {
    _id: id('55be97418e6e627140000007'),
    name: 'Another new <%= resourceName %>'
  },
    <%= resourceNameLower %>3: {
    _id: id('55be8ee58e6e627140000000'),
    name: 'One more cool <%= resourceName %>'
  }
}