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
    /*
    var callback = function(err, body, data) {
      res.json(data)
    }
    */

    apiFlipper = [
      "http://api.wmata.com/NextBusService.svc/json/jPredictions?StopID=1003275&api_key=qrc78gh5rrfhccxn3az498fa",
      "http://api.wmata.com/NextBusService.svc/json/jPredictions?StopID=1003274&api_key=qrc78gh5rrfhccxn3az498fa",
      "http://api.wmata.com/NextBusService.svc/json/jPredictions?StopID=1001765&api_key=qrc78gh5rrfhccxn3az498fa",
      "http://api.wmata.com/NextBusService.svc/json/jPredictions?StopID=1003386&api_key=qrc78gh5rrfhccxn3az498fa",
      "http://api.wmata.com/NextBusService.svc/json/jPredictions?StopID=1002958&api_key=qrc78gh5rrfhccxn3az498fa",
      "http://api.wmata.com/NextBusService.svc/json/jPredictions?StopID=1002959&api_key=qrc78gh5rrfhccxn3az498fa",
    ]

    /*

    for (i = 0; i < apiFlipper.length; i++) {   
      request({
        url: apiFlipper[i],
        json: true
      }, callback)
    }
    */

    var iterator = function(item, itemCallback) {
      request({
        url: item,
        json: true
      }, function(err, body, data) {
        itemCallback(err, data)
      })
    }

    var callback = function(err, results) {
      res.json(results)
    }

    async.map(apiFlipper, iterator, callback)

  }

};

