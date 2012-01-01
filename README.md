
## Dependencies

Currently, the services configuration is in YAML format, so libyaml must be installed.

On OS/X with Homebrew:

    brew install libyaml

On EY Cloud Gentoo:

    sudo emerge libyaml

NOTE: either we should generate a JSON formatted config file or pre-install libyaml ebuild.

## Installation

Add package "ey_config" to your EY Cloud Node.js application's package.json dependencies. For example:

    "dependencies": {
      "ey_config": ">= 0"
    }

Manually:

    npm install ey_config
    
    

## Usage

    var eyConfig = require('ey_config');
    var EYConfig = new eyConfig.Config();
    EYConfig.get('mongodb', 'MONGOHQ_URL')

## Development


## Tests

    npm test

To run specific tests us vows:

    vows test/ey_config_test.js

## Release

Add yourself as an npm package author:

    npm adduser

Then you will need to be added as an owner of the ey_config package. Current owner list:

    $ npm owner ls ey_config
    drnic <drnicwilliams@gmail.com>

To add an owner:

    npm owner add USERNAME ey_config

Update the version in `package.json` to 'X.Y.Z'

Release the latest package:

    git tag vX.Y.Z
    npm publish

