import React, { Component } from "react";
import MapWrapped from "./Map";

export class MainComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ""
    };
  }

  locationSuccess = position => {
    const { latitude, longitude } = position.coords;
    this.props.setCoordinates(latitude, longitude);
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
    const { lat, lng } = this.props;

    if (error) {
      return <h1>{error}</h1>;
    }

    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <MapWrapped
          lat={lat}
          lng={lng}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default MainComponent;
