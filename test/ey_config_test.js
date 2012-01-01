var vows = require('vows'),
    assert = require('assert');

var eyConfig = require('ey_config');

vows.describe('EY Confg').addBatch({
  'for mongodb': {
    topic: new(function() {
      return new eyConfig.Config('test/fixtures/config_mongodb_url.yml');
    }),

    "get('mongodb').MONGODB_URL": function(config) {
      assert.equal(config.get('mongodb').MONGODB_URL, 'mongodb://engineyard:PASSWORD@staff.mongodb.com:10076/environmentname');
    },
    
    "get('mongodb', 'MONGODB_URL')": function(config) {
      assert.equal(config.get('mongodb', 'MONGODB_URL'), 'mongodb://engineyard:PASSWORD@staff.mongodb.com:10076/environmentname');
    }
  },
  'known key, unknown env_variable': {
    topic: new(function() {
      return new eyConfig.Config('test/fixtures/config_mongodb_url.yml');
    }),

    "doesn't contain XYZ for mongodb": function(config) {
      config.get('mongodb', 'XYZ')
      // show raise error
    }
  },
  'unknown key': {
    topic: new(function() {
      return new eyConfig.Config('test/fixtures/config_mongodb_url.yml');
    }),

    "no key provided": function(config) {
      assert.throws(function() {
        config.get();
      }, "Missing argument 'key' to .get(key, env_variable)");
    },
    
    "doesn't contain XYZ": function(config) {
      assert.throws(function() {
        config.get('XYZ');
      }, "Unknown key 'XYZ' to .get(key, env_variable)");
    }
  }
}).export(module); // Export the Suite