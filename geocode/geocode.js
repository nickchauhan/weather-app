const request = require("request");

const geocodeAdress = address => {
  var address = encodeURI(address);
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject("Unable to connect to Google Servers");
        } else if (body.status === "ZERO_RESULTS") {
          reject("Unable to find any address");
        } else if (body.status === "OK") {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        } else {
          reject("Something went Wrong");
        }
      }
    );
  });
};

module.exports = {
  geocodeAdress
};
