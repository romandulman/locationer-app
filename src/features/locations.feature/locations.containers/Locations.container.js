import React, { Component } from "react";
import { connect } from "react-redux";
import { virbrate } from "../../../utils/virbrate";
import {
  sortByAbc,
  sortByCat,
  setForLocations,
  unsetForLocations,
  selectLocItem,
  viewFromCat,
  resetLocList
} from "../locations.redux/Locations.actions";
import queryString from "query-string";
import LocationItem from "../locations.components/LocationItem.component";
import Grid from "@material-ui/core/Grid";
import { styles } from "../locations.assets/stylesheets/locations.stylesheet";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SortIcon from "@material-ui/icons/Sort";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import { FixedSizeList } from "react-window";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import LocationMap from "../locations.components/LocationMap.component";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import VisibilityIcon from "@material-ui/icons/Visibility";

class Locations extends Component {
  constructor(props) {
    super(props);
    this.openDetailsRef = React.createRef();
    this.openMapRef = React.createRef();
  }

  state = {
    selectedItem: null,
    selctedIndex: "",
    allLocLabel: true,
    locationLabel: "",
    selectedItemDetails: "",
    lat: "",
    lng: ""
  };

  componentWillMount() {
    const { dispatch, location } = this.props;
    const values = queryString.parse(location.search);
    dispatch(setForLocations()); //set header menu for Locations page
    if (values.cat) {
      dispatch(viewFromCat(values.cat));
      this.setState({
        locationLabel: values.cat,
        allLocLabel: false
      });
    } else {
      dispatch(resetLocList());
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(unsetForLocations());
  }

  handleListItemClick = (event, indexName, indexNum) => {
    const { dispatch, locations } = this.props;
    console.log(indexNum);
    this.setState({
      selectedItem: indexName,
      selectedIndex: indexNum,
      selectedItemDetails: locations[indexNum],
      lat: parseFloat(locations[indexNum].coordinates.latitude),
      lng: parseFloat(locations[indexNum].coordinates.longitude)
    });
    dispatch(selectLocItem(locations[indexNum]));
    virbrate();
  };

  render() {
    const { locations, classes, dispatch } = this.props;

    const { selectedItem, selectedItemDetails, lng, lat } = this.state;

    const Row = props => {
      const { index, style } = props;
      return (
        <div>
          <ListItem
            component="nav"
            button
            style={style}
            key={index}
            selected={selectedItem === locations[index].name}
            onClick={event =>
              this.handleListItemClick(event, locations[index].name, index)
            }
          >
            <ListItemText
              className={classes.listItem}
              primary={locations[index].name}
            />
          </ListItem>
        </div>
      );
    };

    return (
      <div>
        <br />

        <div className={classes.listBoxDiv}>
          <h2 className={classes.locLabelText}>Locations</h2>
          {selectedItem && locations && (
            <div>
              <LocationItem
                ref={this.openDetailsRef}
                itemDetails={selectedItemDetails}
              />
              <LocationMap
                ref={this.openMapRef}
                lng={lng}
                lat={lat}
                isMarkerShown
              />
            </div>
          )}
          <div className={classes.rootToolbarDiv}>
            <Grid container alignItems="center">
              <div>
                <Tooltip title="Sort by alphabetical order">
                  <IconButton
                    className={classes.menuButton}
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => {
                      dispatch(sortByAbc());
                    }}
                    color="inherit"
                  >
                    <SortByAlphaIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                <Tooltip title="Sort by Category">
                  <IconButton
                    className={classes.menuButton}
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => {
                      dispatch(sortByCat());
                    }}
                    color="inherit"
                  >
                    <SortIcon />
                  </IconButton>
                </Tooltip>
              </div>

              {selectedItem && locations && (
                <div>
                  <Tooltip title="View Map">
                    <IconButton
                      className={classes.menuButton}
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={() => {
                        this.openMapRef.current.handleView();
                      }}
                      color="inherit"
                    >
                      <LocationOnIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              {selectedItem && locations && (
                <div>
                  <Tooltip title="View Details">
                    <IconButton
                      className={classes.menuButton}
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={() => {
                        this.openDetailsRef.current.handleView();
                      }}
                      color="inherit"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </Grid>
          </div>
          <FixedSizeList
            aria-haspopup="true"
            aria-controls="lock-menu"
            className={classes.listBox}
            height={200}
            width={360}
            itemSize={46}
            itemCount={locations.length}
          >
            {Row}
          </FixedSizeList>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.LocationsReducer.locations
  };
};
export default connect(mapStateToProps)(withStyles(styles)(Locations));
