import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Form, Input, Button } from "reactstrap";
import modStyles from "./Weather.module.css";
import { CityWeather } from "./CityWeather";
import { fetchCurrentWeather, fetchWeatherForecast } from "./weatherSlice";

export const Weather = () => {
  const [state, setState] = useState({
    searchCity: "",
    isEmptySearch: null,
    isCityFound: null,
    isInitial: true,
  });
  const weatherData = useSelector((state) => state.weather, shallowEqual);
  const dispatch = useDispatch();

  /* store City to state */
  const handleTextChange = (e) => {
    setState({
      ...state,
      searchCity: e.target.value,
      isEmptySearch: e.target.value.length ? false : true,
    });
  };

  /* handling user submit */
  const handleSubmit = () => {
    if (state.searchCity.length) {
      /* handling search box to make request to api */
      dispatch(fetchCurrentWeather(state.searchCity));
      setState({
        ...state,
        isInitial: false,
      });
    } else {
      /* handling empty search box */
      setState({
        ...state,
        isEmptySearch: true,
      });
    }
  };

  /* following up for the weather data */
  useEffect(() => {
    if (weatherData.current && !weatherData.loading) {
      if (!weatherData.forecast) {
        dispatch(fetchWeatherForecast(weatherData.current.coord));
      }

      setState((preState) => ({
        ...preState,
        isCityFound: true,
      }));
    } else {
      setState((preState) => ({
        ...preState,
        isCityFound: false,
      }));
    }
  }, [weatherData, dispatch]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6 px-md-0">
          {/* Form */}
          <Form
            className="mb-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="row">
              {/* search box */}
              <div className="col-md-10 col-8 pr-0" id="searchText">
                <Input
                  className={modStyles.searchBox}
                  type="text"
                  placeholder="City"
                  onChange={handleTextChange}
                  onBlur={() => {
                    setState({
                      ...state,
                      isEmptySearch: false,
                    });
                  }}
                  value={state.searchCity.length ? state.searchCity : ""}
                />

                {state.isEmptySearch ? (
                  <p className="px-2 mb-0 text-danger">Must not be empty.</p>
                ) : null}
              </div>

              {/* search button */}
              <div className="col-md-2 col-4 text-right">
                <Button
                  className={modStyles.searchButton}
                  type="button"
                  onClick={handleSubmit}
                >
                  Search
                </Button>
              </div>
            </div>
          </Form>

          {weatherData.loading ? (
            /* Loading */
            <div className={modStyles.loadingWrapper}>
              <div className={modStyles.loading} />
            </div>
          ) : state.isInitial ? (
            /* Placeholder for City Weather */
            <div className="row">
              <div className="col-12">
                <div className={modStyles.placeHolder}>
                  <p className="mb-0 text-secondary">
                    Search Your City's Weather
                  </p>
                </div>
              </div>
            </div>
          ) : state.isCityFound &&
            weatherData.current &&
            weatherData.forecast ? (
            /* City Weather */
            <CityWeather props={weatherData} />
          ) : (
            /* City not found */
            <div className="row">
              <div className="col-12">
                <div className={modStyles.notFound}>
                  <h6 className="mb-0">City Not Found.</h6>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
