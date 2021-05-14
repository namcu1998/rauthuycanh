const axios = require("axios");
const { saveDataApi } = require("../data/espData/saveDataEsp");
const key = process.env.API_KEY;

async function getDataApiAsync() {
  const data = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?id=1587923&appid=${key}`
  );
  saveDataApi(data.data.main);
}

module.exports = getDataApiAsync;
