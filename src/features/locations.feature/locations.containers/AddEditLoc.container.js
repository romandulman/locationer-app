import React, { Component } from "react";
import {
  addLocation,
  editLocation
} from "../locations.redux/Locations.actions";
import { getCoords } from "../api/LocationsGeocode.api";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import LocationGeoMap from "../locations.components/LocationGetGeo.component";
import { styles } from "../locations.assets/stylesheets/addeditloc.stylesheet";

class AddLocDialog extends Component {
  constructor(props) {
    super(props);
    this.openGeoCoordsMap = React.createRef();
  }
  state = {
    open: false,
    type: "",
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    category: "",
    oldName: "",
    oldAddress: "",
    oldLatitude: "",
    oldLongitude: "",
    oldCategory: ""
  };

  handleOpenDialog = (type, selectedItem) => {
    this.setState({ open: true });
    if (type === "Edit") {
      this.setState({
        type: "Edit",
        name: selectedItem.name,
        address: selectedItem.address,
        latitude: selectedItem.coordinates.latitude,
        longitude: selectedItem.coordinates.longitude,
        category: selectedItem.category,
        oldName: selectedItem.name,
        oldAddress: selectedItem.address,
        oldLatitude: selectedItem.coordinates.latitude,
        oldLongitude: selectedItem.coordinates.longitude,
        oldCategory: selectedItem.category
      });
    } else {
      this.setState({
        type: "Add",
        name: "",
        address: "",
        latitude: "",
        longitude: "",
        category: ""
      });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAdd = () => {
    const { dispatch } = this.props;
    const {
      type,
      name,
      oldName,
      address,
      oldAddress,
      latitude,
      oldLatitude,
      longitude,
      oldLongitude,
      category,
      oldCategory
    } = this.state;

    const newLoc = {
      name: name,
      address: address,
      coordinates: {
        latitude: latitude,
        longitude: longitude
      },
      category: category
    };

    const oldLoc = {
      name: oldName,
      address: oldAddress,
      coordinates: {
        latitude: oldLatitude,
        longitude: oldLongitude
      },
      category: oldCategory
    };

    if (
      name.length < 2 ||
      address.length < 3 ||
      category.length < 2 ||
      longitude.length < 2 ||
      longitude.length < 2
    ) {
      return alert("All fields are mandatory");
    }
    if (
      window.confirm(`This operation will ${type} a new Location, proceed?`)
    ) {
      type === "Edit"
        ? dispatch(editLocation(oldLoc, newLoc))
        : dispatch(addLocation(newLoc));
      this.handleClose();
    }
  };

  handleOptChange = e => {
    this.setState({
      category: e.target.value
    });
  };

  onFieldChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  getCoordsHelper = toMap => {
    const { address, name } = this.state;
    getCoords(address ? address : name)
      .then(coords => {
        if (toMap) {
          if (address.length<1){
            return alert("We need minimal Address like country name to init Map")
          }
          this.openGeoCoordsMap.current.handleView(coords); // option 2: open Map window to find coords manually after the response receives, minimum address needed to  initiate the marker in the map
        } else {
          this.setState({
            // option 1: Get coords by address
            latitude: coords.lat,
            longitude: coords.lng
          });
        }
      })
      .catch(error =>
        alert("The Address or Name entered is not correct or empty", error)
      );
  };

  coordsReceived = coords => {
    // coords that received from Map child component
    this.setState({
      latitude: coords.lat,
      longitude: coords.lng
    });
  };

  render() {
    const { categories, classes } = this.props;
    const {
      open,
      type,
      name,
      address,
      latitude,
      longitude,
      category
    } = this.state;

    return (
      <div>
        <LocationGeoMap
          coordsReceived={this.coordsReceived}
          ref={this.openGeoCoordsMap}
        />
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialog}
        >
          <DialogTitle id="form-dialog-title">{type} New Location</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To {type} Location item please enter new Location details:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              value={name}
              fullWidth
              onChange={e => {
                this.onFieldChange(e);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="address"
              name="address"
              label="Address"
              type="text"
              value={address}
              fullWidth
              onChange={e => {
                this.onFieldChange(e);
              }}
            />

            <TextField
              className={classes.lat}
              autoFocus
              margin="dense"
              id="latitude"
              name="latitude"
              label="Latitude"
              type="text"
              value={latitude}
              fullWidth
              onChange={e => {
                this.onFieldChange(e);
              }}
            />
            <TextField
              className={classes.lng}
              autoFocus
              margin="dense"
              name="longitude"
              id="longitude"
              label="Longitude"
              value={longitude}
              type="text"
              fullWidth
              onChange={e => {
                this.onFieldChange(e);
              }}
            />
            <br />
            <Button
              color="primary"
              className={classes.coordsBtn1}
              onClick={() => {
                this.getCoordsHelper(false);
              }}
            >
              Search Geo Location By Name/Address
            </Button>
            <Button
              color="primary"
              className={classes.coordsBtn1}
              onClick={() => {
                this.getCoordsHelper(true);
              }}
            >
              Choose Geo Location From Map
            </Button>

            <br />
            <FormControl className={classes.selectCat}>
              <InputLabel htmlFor="categories">Category</InputLabel>
              <Select
                value={category}
                name="category"
                id="category"
                onChange={this.handleOptChange}
                inputProps={{
                  name: "categories",
                  id: "categories"
                }}
              >
                {categories &&
                  categories.map(cat => <MenuItem value={cat}>{cat}</MenuItem>)}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              {type}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.CategoriesReducer.categories
  };
};
export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(withStyles(styles)(AddLocDialog));
