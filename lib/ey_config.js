var fs = require('fs');

var ey_config = exports;
ey_config.config_path = "config/ey_services_config_deploy.json";
ey_config.config = null;

// Usage:
//   get('mongodb', 'MONGODB_URL')
//   get('mongodb').MONGODB_URL
ey_config.get = function(key, env_variable) {
  if (ey_config.config === null) {
    if(! /\.json$/.test(ey_config.config_path) ) { throw "Must provide a json file"; }
    ey_config.config = JSON.parse(fs.readFileSync(ey_config.config_path, 'UTF-8'));
  }

  if (typeof key === "undefined" || key === null) {
    throw "Missing argument 'key' to .get(key, env_variable)"; // FIXME real exception object
  }

  var keyed_config = ey_config.config[key];
  if (typeof keyed_config === "undefined" || keyed_config === null) {
    throw "Unknown key '"+ key + "' to .get(key, env_variable)"; // FIXME real exception object
  }

  if (typeof env_variable !== "undefined" && env_variable !== null) {
    return keyed_config[env_variable];
  } else {
    return keyed_config;
  }
};


// Provide API backwards compatible with 0.1.X
ey_config.Config = function(config_path) {
  if(config_path != null) { ey_config.config_path = config_path; }
  return {__proto__: ey_config};
};
