import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { getDate, formatDate } from "./../utils";
import { TIMETABLE_SHOW_RESULTS_NUMBER, DEFAULT_ZOOM } from "./../constants";

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      selectedStopPoint: null
    };
  }

  setSelectedStopPoint = stopPoint => {
    this.setState({
      selectedStopPoint: stopPoint
    });
  };

  renderJourneysRow = journeys => {
    return journeys.map(journey => {
      return (
        <td key={formatDate(journey.hour, journey.minute)}>
          {formatDate(journey.hour, journey.minute)}
        </td>
      );
    });
  };

  renderSchedule = schedule => {
    const now = new Date();
    const nextJourneys = schedule.knownJourneys.filter(
      journey => getDate(journey.hour, journey.minute) > now
    );
    return (
      <div key={schedule.name}>
        <h3>{schedule.name}</h3>
        <p>
          First journey:
          {formatDate(schedule.firstJourney.hour, schedule.firstJourney.minute)}
        </p>
        <table>
          <tbody>
            <tr>
              {this.renderJourneysRow(
                nextJourneys.slice(0, TIMETABLE_SHOW_RESULTS_NUMBER / 2)
              )}
            </tr>
            <tr>
              {this.renderJourneysRow(
                nextJourneys.slice(
                  TIMETABLE_SHOW_RESULTS_NUMBER / 2,
                  TIMETABLE_SHOW_RESULTS_NUMBER
                )
              )}
            </tr>
          </tbody>
        </table>
        <p>
          Last journey:
          {formatDate(schedule.lastJourney.hour, schedule.lastJourney.minute)}
        </p>
      </div>
    );
  };

  renderStopPointTimetable = timetable => {
    return timetable.timetable.routes.map((route, index) => {
      return (
        <div key={index}>
          {route.schedules.map(schedule => this.renderSchedule(schedule))}
        </div>
      );
    });
  };

  renderInfoWindow = () => {
    const { isFetching, stopPointsTimetables } = this.props;
    const { selectedStopPoint } = this.state;

    if (isFetching) {
      return (
        <div>
          <img alt={"Loading..."} src={"/loading.gif"} />
        </div>
      );
    }

    return (
      <div>
        {stopPointsTimetables[selectedStopPoint.id] ? (
          <h2>{selectedStopPoint.commonName}</h2>
        ) : (
          <h2>There is no information for this station.</h2>
        )}
        {stopPointsTimetables[selectedStopPoint.id] &&
          this.renderStopPointTimetable(
            stopPointsTimetables[selectedStopPoint.id]
          )}
      </div>
    );
  };

  render() {
    const { selectedStopPoint } = this.state;
    const {
      lat,
      lng,
      data,
      onStopPointClick,
      setCoordinatesAndFetchNearbyStops
    } = this.props;
    return (
      <GoogleMap
        ref={this.mapRef}
        defaultZoom={DEFAULT_ZOOM}
        defaultCenter={{ lat, lng }}
        onDragEnd={() => {
          const center = this.mapRef.current.getCenter();
          setCoordinatesAndFetchNearbyStops(center.lat(), center.lng());
        }}
      >
        <Marker
          position={{
            lat,
            lng
          }}
        />
        {data.stopPoints &&
          data.stopPoints.map(point => (
            <Marker
              key={point.id}
              position={{
                lat: point.lat,
                lng: point.lon
              }}
              onClick={() => {
                this.setSelectedStopPoint(point);
                if (point.lines.length) {
                  onStopPointClick(point.lines[0].id, point.id);
                }
              }}
              icon={{
                url: `/transport_icon.png`,
                scaledSize: new window.google.maps.Size(25, 25)
              }}
            />
          ))}

        {selectedStopPoint && (
          <InfoWindow
            onCloseClick={() => {
              this.setSelectedStopPoint(null);
            }}
            position={{
              lat: selectedStopPoint.lat,
              lng: selectedStopPoint.lon
            }}
          >
            {this.renderInfoWindow()}
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
