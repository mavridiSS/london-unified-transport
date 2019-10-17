import { connect } from "react-redux";
import MainComponent from "./MainComponent";
import { setCoordinates } from "./../store/actions";

const mapStateToProps = state => ({
  lat: state.lat,
  lng: state.lng
});

export default connect(
  mapStateToProps,
  { setCoordinates }
)(MainComponent);
