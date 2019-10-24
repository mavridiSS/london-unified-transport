import { connect } from "react-redux";
import MapWrapper from "./MapWrapper";
import {
  setCoordinatesAndFetchNearbyStops,
  fetchStopPointTimetable
} from "../store/actions";

const mapStateToProps = state => ({
  lat: state.lat,
  lng: state.lng,
  data: state.nearbyStops,
  stopPointsTimetables: state.stopPointsTimetables,
  isFetching: state.isFetching
});

export default connect(
  mapStateToProps,
  { setCoordinatesAndFetchNearbyStops, fetchStopPointTimetable }
)(MapWrapper);
