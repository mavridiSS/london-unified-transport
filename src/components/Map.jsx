import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMarker: null
    };
  }

  onCoordinatesChanges = () => {
    // map some redux action to get the data with the new coordinates
  };

  render() {
    console.log(this.props);
    const { lat, lng, data } = this.props;
    return (
      <GoogleMap defaultZoom={10} defaultCenter={{ lat, lng }}>
        {/* {data.map(marker => (
          <Marker
            key={park.properties.PARK_ID}
            position={{
              lat: park.geometry.coordinates[1],
              lng: park.geometry.coordinates[0]
            }}
            onClick={() => {
              setSelectedPark(park);
            }}
            icon={{
              url: `/skateboarding.svg`,
              scaledSize: new window.google.maps.Size(25, 25)
            }}
          />
        ))}

        {selectedPark && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedPark(null);
            }}
            position={{
              lat: selectedPark.geometry.coordinates[1],
              lng: selectedPark.geometry.coordinates[0]
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </InfoWindow>
        )} */}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
