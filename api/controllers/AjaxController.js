var request = require("request")

var warned = false;

var keyGen = function() {
  if (sails.config.WmataApiKeys) {
    if (_.isArray(sails.config.WmataApiKeys)) {
      return _.sample(sails.config.WmataApiKeys)
    }
    else {
      return sails.config.WmataApiKeys
    }
  }
  else {
    if (!warned) {
      sails.log.warn("Hey! You should sign up for a WMATA developer key and enter it in config/local.js.")
      sails.log.warn("Instructions are in the README.md file.")
      sails.log.warn("You're using a community demonstration key with low rate limits right now.")
      warned = true
    }
    
    return "qrc78gh5rrfhccxn3az498fa"
  }
}

module.exports = {
	
  train: function(req, res) {
    
    var callback = function(err, body, data) {
      res.json(data)
    }
    
    var key = keyGen()    

    request({
      url: "http://api.wmata.com/StationPrediction.svc/json/GetPrediction/B04",
      json: true,
      qs: {
        "api_key": key,
        "subscription-key": key
      }
    }, callback)
    
  },
  
  bus: function(req, res) {
    var stops = [
      "1003275",
      "1003274",
      "1001765",
      "1003386",
      "1002958",
      "1002959",
    ]

    var iterator = function(stopId, itemCallback) {
      var key = keyGen()
      
      request({
        url: "http://api.wmata.com/NextBusService.svc/json/jPredictions",
        json: true,
        qs: {
          "api_key": key,
          "subscription-key": key,
          "StopID": stopId
        }
      }, function(err, body, data) {
        itemCallback(err, data)
      })
    }

    var callback = function(err, results) {
      res.json(results)
    }

    async.map(stops, iterator, callback)

  }

};

