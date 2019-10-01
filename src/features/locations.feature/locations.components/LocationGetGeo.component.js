import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { styles } from "../locations.assets/stylesheets/locationmap.stylesheet";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDmUG0WjafiyBPJO6zSJ0tr6bLbAfATU7U&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      this.setState({
        position: null,
        onMarkerMounted: ref => {
          refs.marker = ref;
        },

        onPositionChanged: () => {
          const markerPosition = refs.marker.getPosition();
          //console.log(markerPosition.toString());
          const arr = markerPosition.toString().split(",");
          console.log(arr[0].replace("(", ""));

          const coords = {
            lat: arr[0].replace("(", ""),
            lng: arr[1].replace(")", "")
          };
          this.props.coordsReceived(coords);
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{
      lat: parseFloat(props.coords.lat),
      lng: parseFloat(props.coords.lng)
    }}
  >
    {props.isMarkerShown && (
      <Marker
        position={{
          lat: parseFloat(props.coords.lat),
          lng: parseFloat(props.coords.lng)
        }}
        draggable={true}
        ref={props.onMarkerMounted}
        onPositionChanged={props.onPositionChanged}
      />
    )}
  </GoogleMap>
));

class MyParentComponentWrapper extends React.PureComponent {
  state = {
    isMarkerShown: false,
    open: false,
    coords: ""
  };

  handleView = initCoords => {
    const { open } = this.state;
    this.setState({
      open: !open,
      initCoords: initCoords, //initCoords?initCoords:"",
      receivedCoordsData: ""
    });
  };

  coordsReceived = coords => {
    // coords received from map child component
    this.setState({
      receivedCoordsData: coords
    });
  };

  enterReceivedCoords = () => {
    // send received coords and send to parent
    const { coordsReceived } = this.props;
    const { receivedCoordsData } = this.state;
    coordsReceived(receivedCoordsData);
    this.handleView();
  };

  render() {
    const { classes } = this.props;
    const { initCoords, open } = this.state;
    return (
      <Dialog open={open} onClose={this.handleView}>
        <DialogTitle>Choose GeoLocation Coordinates </DialogTitle>
        <DialogContent className={classes.map}>
          <div>
            {initCoords && (
              <MyMapComponent
                coordsReceived={this.coordsReceived}
                coords={initCoords}
                isMarkerShown={true}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleView} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={this.enterReceivedCoords} color="primary" autoFocus>
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(MyParentComponentWrapper);
