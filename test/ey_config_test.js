var vows = require('vows'),
    assert = require('assert');

var eyConfig = require('ey_config');

vows.describe('EY Confg').addBatch({
  'for mongodb': {
    topic: new(function() {
      return new eyConfig.Config('test/fixtures/config_mongodb_url.yml');
    }),

    'contains MONGODB_URL': function(config) {
      assert.equal(config.get('mongodb').MONGODB_URL, 'mongodb://engineyard:PASSWORD@staff.mongodb.com:10076/environmentname');
    }
  }
}).export(module); // Export the Suite