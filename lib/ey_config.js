var yaml = require('libyaml');

exports.Config = function(config_path) {
  this.config = yaml.loadFileSync(config_path)[0];
};

// Usage:
//   new Config().get('mongodb', 'MONGODB_URL') # TODO
//   new Config().get('mongodb').MONGODB_URL
exports.Config.prototype.get = function(key, env_variable) {
  if (typeof key === "undefined" || key === null) {
    throw "Missing argument 'key' to .get(key, env_variable)"; // FIXME real exception object
  }
  var keyed_config = this.config[key];
  if (typeof keyed_config === "undefined" || keyed_config === null) {
    throw "Unknown key '"+ key + "' to .get(key, env_variable)"; // FIXME real exception object
  }
  if (typeof env_variable !== "undefined" && env_variable !== null) {
    return keyed_config[env_variable];
  } else {
    return keyed_config;
  }
};
