import React, { Component } from "react";

export class LocationInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "" // it should be current location
    };
  }

  onLocationChange = e => {
    this.setState({
      location: e.target.value
    });
  };

  render() {
    const { location } = this.state;

    return (
      <div>
        <input value={location} onChange={this.onLocationChange} />
      </div>
    );
  }
}

export default LocationInput;
