assert = require("assert")
ey_config = require("../lib/ey_config")

describe "EY Config", ->
  beforeEach ->
    assert.equal ey_config.config, null

  afterEach ->
    ey_config.config = null

  describe "with a real config", ->
    beforeEach ->
      ey_config.config_path = "test/fixtures/ey_services_config_deploy.json"

    it "returns an object when given a key", ->
      value = ey_config.get("mongodb")
      assert.equal typeof value, "object"
      assert.equal value.MONGODB_URL, "mongodb://engineyard:PASSWORD@staff.mongodb.com:10076/environmentname"

    it "accepts the environment variable to get as a second argument", ->
      assert.equal ey_config.get("mongodb", "MONGODB_URL"), "mongodb://engineyard:PASSWORD@staff.mongodb.com:10076/environmentname"

    it "returns null when the environment variable does not exist", ->
      assert.equal ey_config.get("mongodb", "INVALID_VARIABLE"), null

    it "throws when the key does not exist", ->
      assert.throws ->
        ey_config.get "invalid_key"


    it "throws when no key is given", ->
      assert.throws ->
        ey_config.get()



  describe "with a missing config file", ->
    beforeEach ->
      ey_config.config_path = "test/fixtures/does_not_exist.json"
      ey_config.config = null

    it "should throw an exception when attempting to get a variable", ->
      assert.throws (->
        ey_config.get "mongodb", "MONGODB_URL"
      ), /ENOENT/


  describe "backwards compatible api", ->
    it "works", ->
      ey_config.config_path = "test/fixtures/does_not_exist.json"
      EYConfig = new ey_config.Config("test/fixtures/ey_services_config_deploy.json")
      assert.equal EYConfig.get("mongodb", "MONGODB_URL"), "mongodb://engineyard:PASSWORD@staff.mongodb.com:10076/environmentname"
      assert.equal EYConfig.get("mongodb").MONGODB_URL, "mongodb://engineyard:PASSWORD@staff.mongodb.com:10076/environmentname"

    it "doesn't stomp on config_path if not given", ->
      ey_config.config_path = "test/fixtures/ey_services_config_deploy.json"
      EYConfig = new ey_config.Config()
      assert.equal EYConfig.get("mongodb", "MONGODB_URL"), "mongodb://engineyard:PASSWORD@staff.mongodb.com:10076/environmentname"
      assert.equal EYConfig.get("mongodb").MONGODB_URL, "mongodb://engineyard:PASSWORD@staff.mongodb.com:10076/environmentname"

    it "is Configs all the way down", ->
      ey_config.config_path = "test/fixtures/ey_services_config_deploy.json"
      EYConfig = new (new (new (new ey_config.Config).Config).Config).Config
      assert.equal EYConfig.get("mongodb", "MONGODB_URL"), "mongodb://engineyard:PASSWORD@staff.mongodb.com:10076/environmentname"
      assert.equal EYConfig.get("mongodb").MONGODB_URL, "mongodb://engineyard:PASSWORD@staff.mongodb.com:10076/environmentname"



