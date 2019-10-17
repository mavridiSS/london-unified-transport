const initialState = {
  lat: null,
  lng: null,
  nearbyStops: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_COORDINATES":
      return {
        ...state,
        lat: action.lat,
        lng: action.lng
      };
    case "FETCH_NEARBY_STOPS":
      return {
        ...state,
        nearbyStops: action.payload
      };
    default:
      return state;
  }
}

export default rootReducer;
