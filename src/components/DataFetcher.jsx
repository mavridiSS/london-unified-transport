import React, { Component } from "react";

const API_ID = "0093cee0";
const APP_KEY = "c52c799560463d2518c24ab27e00038d";

const BASE_URL = "https://api.tfl.gov.uk";
const API_ROUTE = "/StopPoint/Meta/Modes";
const API_URL = `${BASE_URL}${API_ROUTE}?app_key=${APP_KEY}&app_id=${API_ID}`;

// ["NaptanBusCoachStation","NaptanMetroStation",NaptanPublicBusCoachTram","NaptanRailStation","NaptanSharedTaxi","NaptanTaxiRank"]

// find the stops around him witnin some radius
// https://api.tfl.gov.uk/Stoppoint?lat=51.513395&lon=-0.089095&stoptypes=NaptanMetroStation,NaptanRailStation,NaptanBusCoachStation,NaptanPublicBusCoachTram&radius=200
// add the stops as markers in the map
// get the timetables for each stop

export class DataFetcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoaded: false,
      error: null
    };
  }

  componentDidMount() {
    fetch(API_URL)
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    return <div>{JSON.stringify(this.state.data)}</div>;
  }
}

export default DataFetcher;
