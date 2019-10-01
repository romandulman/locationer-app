import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { styles } from "../locations.assets/stylesheets/locationmap.stylesheet";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class Map extends Component {
  state = {
    open: false
  };
  static defaultProps = {
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDmUG0WjafiyBPJO6zSJ0tr6bLbAfATU7U&libraries=geometry,drawing,places"
  };

  handleView = () => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  };

  CMap = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
      >
        {props.children}
      </GoogleMap>
    ))
  );

  render() {
    const { classes } = this.props;

    return (
      <Dialog open={this.state.open} onClose={this.handleView}>
        <DialogTitle id="alert-dialog-title">Location Map</DialogTitle>
        <DialogContent className={classes.map}>
          <Fragment>
            <this.CMap
              googleMapURL={this.props.googleMapURL}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `700px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              center={{ lat: 25.03, lng: 121.6 }}
            >
              <Marker position={{ lat: this.props.lat, lng: this.props.lng }} />
            </this.CMap>
          </Fragment>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleView} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(Map);
