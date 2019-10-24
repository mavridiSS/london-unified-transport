const initialState = {
  lat: null,
  lng: null,
  nearbyStops: [],
  stopPointsTimetables: {},
  isFetching: false,
  errorMsg: ""
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_COORDINATES":
      return {
        ...state,
        lat: action.lat,
        lng: action.lng
      };
    case "REQUEST_STOP_POINT_TIMETABLE":
    case "REQUEST_NEARBY_STOPS":
      return {
        ...state,
        isFetching: true
      };
    case "REQUEST_STOP_POINT_TIMETABLE_FAILURE":
    case "REQUEST_NEARBY_STOPS_FAILURE":
      return {
        ...state,
        isFetching: false,
        errorMsg: action.errorMsg
      };
    case "RECEIVE_NEARBY_STOPS":
      return {
        ...state,
        isFetching: false,
        nearbyStops: action.payload
      };
    case "RECEIVE_STOP_POINT_TIMETABLE":
      return {
        ...state,
        isFetching: false,
        stopPointsTimetables: {
          ...state.stopPointsTimetables,
          [action.stopPointId]: action.payload
        }
      };
    default:
      return state;
  }
}

export default rootReducer;
