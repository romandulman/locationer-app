import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EarthImg from "./assets/images/earth.png";
import "./assets/stylesheets/splash.stylesheet.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CategoryIcon from "@material-ui/icons/Category";
export default function SplashDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" "}
          <img className="earth-img" alt="earth" src={EarthImg} />
          {"Locationer"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hi, welcome to Locationer!
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Locationer is locations management application built with React.js.
            <ul>
              <li>
                <strong>
                  To view specific locations group choose one of the categories
                  in the list and press the <VisibilityIcon /> icon on the top
                  bar
                </strong>
              </li>
              <li>
                <strong>
                  To Add Categories or Location press on the{" "}
                  <AddCircleOutlineIcon /> icon on the top bar
                </strong>
              </li>
              <li>
                <strong>
                  To Edit Categories or Location press on the <EditIcon /> icon
                  on the top bar
                </strong>
              </li>
              <li>
                <strong>
                  To Delete Categories or Location press on the <DeleteIcon />{" "}
                  icon on the top bar
                </strong>
              </li>
              <li>
                <strong>
                  To switch between Categories page and all Locations page press{" "}
                  <LocationOnIcon /> or <CategoryIcon /> icons on the bottom nav{" "}
                </strong>
              </li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
