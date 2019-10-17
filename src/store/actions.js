export function fetchNearbyStops(lat, lng) {
  return {
    type: "FETCH_NEARBY_STOPS",
    lat,
    lng
  };
}

export function setCoordinates(lat, lng) {
  return {
    type: "SET_COORDINATES",
    lat,
    lng
  };
}
