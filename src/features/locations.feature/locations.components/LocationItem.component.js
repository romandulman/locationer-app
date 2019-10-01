import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

class LocationItem extends Component {
  state = {
    open: false
  };

  handleView = () => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  };
  render() {
    const { open } = this.state;
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleView}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Location Details</DialogTitle>
          <DialogContent>
            <Typography variant="body1" component="p">
              <strong>Name:</strong> {this.props.itemDetails.name}
            </Typography>
            <Typography variant="body1" component="p">
              <strong>Address:</strong> {this.props.itemDetails.address}
            </Typography>
            <Typography variant="body1" component="p">
              <strong> Coordinates:</strong> latitude:{" "}
              {this.props.itemDetails.coordinates.latitude}, longitude:{" "}
              {this.props.itemDetails.coordinates.longitude}
            </Typography>
            <Typography variant="body1" component="p">
              <strong>Category:</strong> {this.props.itemDetails.category}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleView} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default LocationItem;
