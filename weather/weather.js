const request = require("request");

var getWeather = (lat, long) => {
  return new Promise((resolve, reject) => {
    // dark sky api
    var apiKey = "5a46e80466454f6694bc4aff0bf54367";
    var apiUrl = "https://api.darksky.net/forecast/";
    var units = "units=si";
    var api = `${apiUrl + apiKey}/${lat},${long}?${units}`;
    request(
      {
        uri: api,
        json: true
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve({
            temp: response.body.currently.temperature,
            apptTemp: response.body.currently.apparentTemperature,
            summary: response.body.currently.summary
          });
        } else {
          reject("Unable to fetch Weather Details");
        }
      }
    );
  });
};

module.exports = {
  getWeather
};
