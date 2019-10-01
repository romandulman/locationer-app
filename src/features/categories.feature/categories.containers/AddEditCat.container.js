import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  addCategory,
  editCategory
} from "../categories.redux/Categories.actions";
import { connect } from "react-redux";

class AddCatDialog extends Component {
  state = {
    open: false,
    categoryValue: "",
    saveToEdit: "",
    type: ""
  };

  handleOpenDialog = (type, selectedItem) => {
    this.setState({
      open: true
    });

    if (type === "Edit") {
      this.setState({
        type: type,
        categoryValue: selectedItem,
        oldValToEdit: selectedItem
      });
    } else {
      this.setState({
        type: "Add"
      });
    }
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleAdd = () => {
    const { dispatch } = this.props;
    const { categoryValue, oldValToEdit, type } = this.state;
    if (categoryValue.length < 2) {
      return alert("The Category name is too short or empty");
    }
    if (window.confirm("This operation will add a new Category, proceed?")) {
      type === "Edit"
        ? dispatch(editCategory(oldValToEdit, categoryValue))
        : dispatch(addCategory(categoryValue));
      this.handleClose();
    }
  };

  render() {
    const { open, type, categoryValue } = this.state;
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{type} Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To {type} Category item please enter new Category name:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="category"
              name="category"
              label="Category Name"
              type="text"
              value={categoryValue}
              fullWidth
              onChange={e => {
                this.setState({
                  categoryValue: e.target.value
                });
              }}
            />
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

export default connect(
  null,
  null,
  null,
  { forwardRef: true }
)(AddCatDialog);
