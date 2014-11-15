var request = require("request")

module.exports = {
	
  index: function(req, res) {
    
    var callback = function(err, body, data) {
      res.json(data)
    }
    
    request({
      url: "http://api.wmata.com/StationPrediction.svc/json/GetPrediction/B04?api_key=qrc78gh5rrfhccxn3az498fa",
      json: true
    }, callback)
    
  }
  
};

