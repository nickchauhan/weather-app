const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

const request = require("request");
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

// ----------- using callbacks -------------
// geocode.geocodeAdress(argv.address, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res.address);

//     weather.getWeather(res.latitude, res.longitude, (err, res) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(
//           `Temperature is ${res.temp}° C. It feels like ${res.apptTemp}° C.`
//         );
//         console.log(`Climate is mostly ${res.summary}.`);
//       }
//     });
//   }
// });

// ----------- using Promises ------------- //
// geocode
//   .geocodeAdress(argv.address)
//   .then(res => {
//     console.log(res.address);
//     return weather.getWeather(res.latitude, res.longitude);
//   })
//   .then(res => {
//     console.log(
//       `Temperature is ${res.temp}° C. It feels like ${res.apptTemp}° C.`
//     );
//     console.log(`Climate is mostly ${res.summary}.`);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// ----- using async / await and promises----

async function getClimate(address) {
  const location = await geocode.geocodeAdress(address);
  const climate = await weather.getWeather(
    location.latitude,
    location.longitude
  );
  // console.log(location);
  // console.log(weather);
  return { location, climate };
}

getClimate(argv.address)
  .then(res => {
    // console.log(res);
    console.log(res.location.address);
    console.log(
      `Temperature is ${res.climate.temp}° C. It feels like ${
        res.climate.apptTemp
      }° C.`
    );
  })
  .catch(err => {
    console.log(err);
  });
