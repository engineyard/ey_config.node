var vows = require('vows'),
    assert = require('assert');

var eyConfig = require('ey_config');

var EYConfig = eyConfig.Config;

vows.describe('EY Confg').addBatch({
    'MongoHQ': {
        topic: new(EYConfig),

        'contains MONGOHQ_URL': function (config) {
            assert.equal (config.mongodb.MONGOHQ_URL, 'mongodb://engineyard:PASSWORD@staff.mongohq.com:10076/environmentname');
        }
    }
}).export(module); // Export the Suite