import moment from "moment";
import React from "react";
import modStyles from "./Weather.module.css";

export const CityWeather = ({ props }) => {
  const { current, forecast } = props;
  const currWeather = current.weather[0];
  const imgUrl = `http://openweathermap.org/img/wn/${currWeather.icon}`;
  const sunrise = moment.unix(current.sys.sunrise).format("hh:mm a");
  const sunset = moment.unix(current.sys.sunset).format("hh:mm a");

  const forecastArr = forecast.daily
    .filter((temp) => moment.unix(temp.dt).date() > moment().date())
    .slice(0, 5);

  const forecastList = forecastArr.map(item => (
    <div className={modStyles.foreCast} key={item.dt}>
      <p className="text-uppercase mb-0 font-weight-bold">{moment.unix(item.dt).format("ddd")}</p>
      <img
        src={"http://openweathermap.org/img/wn/" + item.weather[0].icon + ".png"}
        className="img-fluid"
        alt={"Open Weather Forecast " + item.weather[0].icon}
      />
      <p className="text-center mb-0">{Math.round(item.temp.day)}&deg;C</p>
    </div>
  ));

  return (
    <div className="row">
      <div className="col-12">
        <div className={modStyles.weatherWrapper}>
          <h5 className="text-center text-capitalize">{current.name}</h5>

          {/* Weather Staff */}
          <div className="row">
            <div className="col-md-4 col-6 text-center">
              <img
                src={imgUrl + "@2x.png"}
                className="img-fluid"
                alt={"Open Weather " + currWeather.icon}
              />
              <p className="font-weight-bold mb-0 text-capitalize">
                {currWeather.description}
              </p>
            </div>

            <div className="col-md-4 col-6 d-flex justify-content-center align-items-center">
              <h4 className="mb-0">{Math.round(current.main.temp)}&deg;C</h4>
            </div>

            <div
              className={`col-md-4 mt-md-0 mt-4 ${modStyles.weatherStaffWrapper}`}
            >
              <div className={modStyles.weatherStaff}>
                <p className={modStyles.description}>Wind</p>
                <span className={modStyles.sperater}>:</span>
                <p className={modStyles.value}>{current.wind.speed} m/s</p>
              </div>
              <div className={modStyles.weatherStaff}>
                <p className={modStyles.description}>Sunrise</p>
                <span className={modStyles.sperater}>:</span>
                <p className={modStyles.value}>{sunrise}</p>
              </div>
              <div className={modStyles.weatherStaff}>
                <p className={modStyles.description}>Sunset</p>
                <span className={modStyles.sperater}>:</span>
                <p className={modStyles.value}>{sunset}</p>
              </div>
            </div>
          </div>

          {/* foreCast */}
          <div className="row">
            {forecastList}
          </div>
        </div>
      </div>
    </div>
  );
};
