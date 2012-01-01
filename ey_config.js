exports.Config = function(config_path) {
};

// new Config().get('mongodb').MONGODB_URL
exports.Config.prototype.get = function(key) {
  return { MONGODB_URL: 'hitherenow'};
};
