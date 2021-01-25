import React from "react";
import modStyles from "./Weather.module.css";

export const CityWeather = ({props}) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className={modStyles.weatherWrapper}>
          <h5 className="text-center">City name</h5>

          {/* Weather Staff */}
          <div className="row">
            <div className="col-md-4 col-6 text-center">
              <img
                src="http://openweathermap.org/img/wn/10d@2x.png"
                className="img-fluid"
              />
              <p className="font-weight-bold mb-0">Cloudy</p>
            </div>

            <div className="col-md-4 col-6 d-flex justify-content-center align-items-center">
              <h4 className="mb-0">34 C</h4>
            </div>

            <div
              className={`col-md-4 mt-md-0 mt-4 ${modStyles.weatherStaffWrapper}`}
            >
              <div className={modStyles.weatherStaff}>
                <p className={modStyles.description}>Wind</p>
                <span className={modStyles.sperater}>:</span>
                <p className={modStyles.value}>2.1 m/s</p>
              </div>
              <div className={modStyles.weatherStaff}>
                <p className={modStyles.description}>Sunrise</p>
                <span className={modStyles.sperater}>:</span>
                <p className={modStyles.value}>2.1 m/s</p>
              </div>
              <div className={modStyles.weatherStaff}>
                <p className={modStyles.description}>Sunset</p>
                <span className={modStyles.sperater}>:</span>
                <p className={modStyles.value}>2.1 m/s</p>
              </div>
            </div>
          </div>

          {/* foreCast */}
          <div className="row">
            <div className={modStyles.foreCast}>
              <p className="text-uppercase mb-0">thu</p>
              <img
                src="http://openweathermap.org/img/wn/10d.png"
                className="img-fluid"
              />
              <p className="text-center mb-0">30 C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
