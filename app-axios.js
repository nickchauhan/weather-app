const yargs = require("yargs");
const axios = require("axios");
const argv = yargs
  .option({
    a: {
      describe: "Address of fetch weather of",
      alias: "address",
      string: true,
      demand: true
    }
  })
  .help()
  .alias("h", "help").argv;

// async await using axios
async function getAreaWeather(address) {
  var location = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`
  );
  if (location.data.status == "OK") {
    var address = location.data.results[0].formatted_address;
    console.log(address);
    var lat = location.data.results[0].geometry.location.lat;
    var long = location.data.results[0].geometry.location.lng;
    console.log(lat, long);
    // dark sky api
    var apiKey = "5a46e80466454f6694bc4aff0bf54367";
    var apiUrl = "https://api.darksky.net/forecast/";
    var units = "units=si";
    var api = `${apiUrl + apiKey}/${lat},${long}?${units}`;
    try {
      var weather = await axios.get(api);
      var current = weather.data.currently;
      console.log(
        `Temperature is ${current.temperature}° C. It feels like ${
          current.apparentTemperature
        }° C.`
      );
      console.log(`Climate here is ${current.summary}`);
    } catch (e) {
      console.log(e.message);
    }
  } else {
    console.log("Google API response error");
  }
}

getAreaWeather(argv.address);
