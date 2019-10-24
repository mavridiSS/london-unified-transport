import React, { Component } from "react";
import Map from "./Map";
import { GOOGLE_MAPS_URL } from "../constants";

export class MapWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ""
    };
  }

  locationSuccess = position => {
    const { latitude, longitude } = position.coords;
    this.props.setCoordinatesAndFetchNearbyStops(latitude, longitude);
  };

  locationError = error => {
    this.setState({
      error: error.message
    });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.locationSuccess,
      this.locationError
    );
  }

  render() {
    const { error } = this.state;
    const {
      lat,
      lng,
      fetchStopPointTimetable,
      setCoordinatesAndFetchNearbyStops,
      data,
      stopPointsTimetables,
      isFetching
    } = this.props;

    if (error || (!lat || !lng)) {
      return <h1>{error}</h1>;
    }

    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Map
          lat={lat}
          lng={lng}
          onStopPointClick={fetchStopPointTimetable}
          setCoordinatesAndFetchNearbyStops={setCoordinatesAndFetchNearbyStops}
          data={data}
          isFetching={isFetching}
          stopPointsTimetables={stopPointsTimetables}
          googleMapURL={GOOGLE_MAPS_URL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default MapWrapper;
