const axios = require("axios");
const { saveDataApi } = require("../data/espData/saveDataEsp");
const key = process.env.API_KEY;

async function getDataApiAsync() {
  const data = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?id=1587923&appid=${key}`
  );
  saveDataApi({
    temp: Math.abs(data.data.main.temp - 273.15),
    feels_like: data.data.main.feels_like,
    temp_min: data.data.main.temp_min,
    temp_max: data.data.main.temp_max,
    pressure: data.data.main.pressure,
    humidity: data.data.main.humidity,
    sea_level: data.data.main.sea_level,
    grnd_level: data.data.main.grnd_level,
  });
}

module.exports = getDataApiAsync;
