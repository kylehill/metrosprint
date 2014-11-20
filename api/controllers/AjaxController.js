var request = require("request")

module.exports = {
	
  train: function(req, res) {
    
    var callback = function(err, body, data) {
      res.json(data)
    }
    
    request({
      url: "http://api.wmata.com/StationPrediction.svc/json/GetPrediction/B04?api_key=qrc78gh5rrfhccxn3az498fa",
      json: true
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
      var key = _.sample(sails.config.WmataApiKeys)
      
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

