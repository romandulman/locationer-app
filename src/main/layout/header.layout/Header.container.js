import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { styles } from "./assets/stylesheets/Header.stylesheet";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { AddEditLoc, AddEditCat } from "../../../features";
import { remLocation, remCategory } from "../../../features";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.openDialogRef = React.createRef();
  }

  state = {
    selectedItem: null,
    selctedIndex: ""
  };

  removeItem = () => {
    const { setLoc, dispatch, selectedItem } = this.props;
    if (!selectedItem) {
      alert("Please select an item to Edit to delete !");
    } else {
      if (window.confirm("Are you Sure?")) {
        setLoc
          ? dispatch(remLocation(selectedItem.name))
          : dispatch(remCategory(selectedItem));
      }
    }
  };

  editItem = () => {
    const { selectedItem } = this.props;
    if (!selectedItem) {
      alert("Please select an item to Edit !");
    } else {
      this.openDialogRef.current.handleOpenDialog("Edit", selectedItem);
    }
  };

  handleViewCatLocItems = () => {
    const { history, selectedItem } = this.props;
    if (!selectedItem) {
      alert("Please select an Category to view her Locations !");
    } else {
      history.push(`/locations?cat=${selectedItem}`);
    }
  };

  render() {
    const { classes, setLoc, setCat } = this.props;

    return (
      <div className={classes.root}>
        {setLoc && <AddEditLoc ref={this.openDialogRef} />}
        {setCat && <AddEditCat ref={this.openDialogRef} />}
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <LocationOnIcon className={classes.brandIcon} /> Locationer
            </Typography>
            <AddEditCat ref={this.openDialogRef} />

            {setCat && (
              <div>
                <Tooltip title="View">
                  <IconButton
                    className={classes.menuButton}
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleViewCatLocItems}
                    color="inherit"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
            <div>
              <Tooltip title="Edit">
                <IconButton
                  className={classes.menuButton}
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.editItem}
                  color="inherit"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Delete">
                <IconButton
                  className={classes.menuButton}
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.removeItem}
                  color="inherit"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Add">
                <IconButton
                  className={classes.menuButton}
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => {
                    this.openDialogRef.current.handleOpenDialog("Add", null);
                  }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.CategoriesReducer.categories,
    setLoc: state.LocationsReducer.setLoc,
    setCat: state.CategoriesReducer.setCat,
    selectedItem: state.LocationsReducer.setLoc
      ? state.LocationsReducer.selectedItem
      : state.CategoriesReducer.selectedItem
  };
};
export default connect(mapStateToProps)(withRouter(withStyles(styles)(Header)));
