import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "reactstrap";
import modStyles from "./Weather.module.css";
import { CityWeather } from "./CityWeather";

export const Weather = () => {
  const [state, setState] = useState({
    searchCity: "",
    isEmptySearch: null,
    isCityFound: null,
    isInitial: true,
  });

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
      console.log("querySending", state);
    } else {
      /* handling empty search box */
      setState({
        ...state,
        isEmptySearch: true,
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6 px-md-0">
          {/* Form */}
          <Form className="mb-3">
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
                ) : (
                  <></>
                )}
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

          {state.isCityFound == null ? (
            
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

          ) : state.isCityFound ? (

            /* City Weather */
            <CityWeather props="something" />

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
