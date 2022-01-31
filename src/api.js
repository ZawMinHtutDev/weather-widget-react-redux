import axios from "axios";

const Weather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

const API_KEY = "8987ec749d8441ea00a6a57cc07b8509";

export default {
  fetchCurrentWeather: async (query) => {
    try {
        const res = await Weather.get("weather", {
            params: {
              q: query,
              units: "metric",
              appid: API_KEY,
            },
        });

        return res;

    } catch (err) {
        console.clear();
        console.log("Failed in making request for current Weather.\n",err.message);

        return { data: null };
    }
  },
  fetchWeatherForecast: async ({ lat, lon }) => {
    try {
      const res = await Weather.get("onecall", {
        params: {
          lat,
          lon,
          units: "metric",
          exculde: ["hourly", "current"],
          appid: API_KEY,
        },
      });
    
      return res;

    } catch (err) {
        console.clear();
        console.log("Failed in making request for Weather Forecast => ", err.message);

      return { data: null };
    }
  },
};
