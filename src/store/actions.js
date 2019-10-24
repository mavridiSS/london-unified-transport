import { getStopPointTimetableURL, getNearbyStopsURL } from "./../utils";

export function setCoordinatesAndFetchNearbyStops(lat, lng) {
  return dispatch => {
    dispatch(setCoordinates(lat, lng));
    dispatch(requestNearbyStops());

    return fetch(getNearbyStopsURL(lat, lng))
      .then(res => res.json())
      .then(
        data => dispatch(receiveNearbyStops(data)),
        error => dispatch(requestNearbyStopsFailure(error))
      );
  };
}

export function requestNearbyStops() {
  return {
    type: "REQUEST_NEARBY_STOPS"
  };
}

export function requestNearbyStopsFailure(error) {
  return {
    type: "REQUEST_NEARBY_STOPS_FAILURE",
    errorMsg: error.message || "Something bad happened"
  };
}

export function receiveNearbyStops(data) {
  return {
    type: "RECEIVE_NEARBY_STOPS",
    payload: data
  };
}

export function setCoordinates(lat, lng) {
  return {
    type: "SET_COORDINATES",
    lat,
    lng
  };
}

export function requestStopPointTimetable() {
  return {
    type: "REQUEST_STOP_POINT_TIMETABLE"
  };
}

export function receiveStopPointTimetable(data, stopPointId) {
  return {
    type: "RECEIVE_STOP_POINT_TIMETABLE",
    payload: data,
    stopPointId
  };
}

export function requestStopPointTimetableFailure(error) {
  return {
    type: "REQUEST_STOP_POINT_TIMETABLE_FAILURE",
    errorMsg: error.message || "Something bad happened"
  };
}

export function fetchStopPointTimetable(lineId, stopPointId) {
  return dispatch => {
    dispatch(requestStopPointTimetable());

    return fetch(getStopPointTimetableURL(lineId, stopPointId))
      .then(res => res.json())
      .then(
        data => dispatch(receiveStopPointTimetable(data, stopPointId)),
        error => dispatch(requestStopPointTimetableFailure(error))
      );
  };
}
