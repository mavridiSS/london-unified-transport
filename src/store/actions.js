const API_ID = "0093cee0";
const APP_KEY = "c52c799560463d2518c24ab27e00038d";

const BASE_URL = "https://api.tfl.gov.uk";
const API_ROUTE = "/StopPoint/Meta/Modes";
// const API_URL = `${BASE_URL}${API_ROUTE}?app_key=${APP_KEY}&app_id=${API_ID}`;
const API_URL = `https://api.tfl.gov.uk/Stoppoint?lat=51.513395&lon=-0.089095&stoptypes=NaptanMetroStation,NaptanRailStation,NaptanBusCoachStation,NaptanPublicBusCoachTram&radius=200&app_key=${APP_KEY}&app_id=${API_ID}`;
const STOP_POINT_TIMETABLE_URL = `https://api.tfl.gov.uk/Line/${lineId}/Timetable/${stopPointId}?app_key=${APP_KEY}&app_id=${API_ID}`;

export function fetchNearbyStops() {
  return dispatch => {
    dispatch(requestNearbyStops());

    return fetch(API_URL)
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

export function receiveStopPointTimetable(data) {
  return {
    type: "RECEIVE_STOP_POINT_TIMETABLE",
    payload: data
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

    return fetch(API_URL)
      .then(res => res.json())
      .then(
        data => dispatch(receiveStopPointTimetable(data)),
        error => dispatch(requestStopPointTimetableFailure(error))
      );
  };
}
