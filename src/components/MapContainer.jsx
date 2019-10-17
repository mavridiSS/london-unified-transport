import { connect } from "react-redux";
import { fetchNearbyStops } from "./../store/actions";
import Map from "./Map";

const mapStateToProps = state => ({
  data: state.nearbyStops
});

const mapDispatchToProps = dispatch => {
  return {
    fetchNearbyStops: (lat, lng) => fetchNearbyStops(lat, lng)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
