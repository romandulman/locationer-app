import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CategoryIcon from "@material-ui/icons/Category";
import Divider from "@material-ui/core/Divider";
import { styles } from "./assets/stylesheets/Footer.stylesheet";

const useStyles = makeStyles(styles);

const FooterNavbar = () => {
  const classes = useStyles();
  return (
    <div>
      <br />
      <Divider variant="middle" />
      <br />
      <BottomNavigation showLabels className={classes.root}>
        <BottomNavigationAction
          component={Link}
          to="/categories"
          label="Categories"
          icon={<CategoryIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/locations"
          label="Locations"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
    </div>
  );
};
export default FooterNavbar;
