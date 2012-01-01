
## Installation

Add package "ey_config" to your EY Cloud Node.js application's package.json dependencies. For example:

    "dependencies": {
      "ey_config": ">= 0"
    }

Manually:

    npm install ey_config
    
    

## Usage

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
