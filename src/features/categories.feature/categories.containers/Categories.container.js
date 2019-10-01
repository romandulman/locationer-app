import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import { styles } from "../assets/stylesheets/categories.stylesheet";
import {
  setForCategory,
  unsetForCategory,
  selectCatItem
} from "../categories.redux/Categories.actions";
import {virbrate} from "../../../utils/virbrate";

class Categories extends Component {
  state = {
    selectedItem: selectCatItem
  };
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setForCategory()); // set Header menu for Categories page
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(unsetForCategory());
  }

  handleListItemClick = (event, indexName) => {
    const { dispatch } = this.props;
    this.setState({ selectedItem: indexName });
    dispatch(selectCatItem(indexName));
    virbrate();
  };

  render() {
    const { categories, classes } = this.props;
    const { selectedItem } = this.state;

    const Row = props => {
      const { index, style } = props;
      return (
        <ListItem
          button
          style={style}
          key={index}
          selected={selectedItem === categories[index]}
          onClick={event => this.handleListItemClick(event, categories[index])}
        >
          <ListItemText
            className={classes.listItem}
            primary={categories[index]}
          />
        </ListItem>
      );
    };
    return (
      <div>
        <br />
        <div className={classes.listBoxDiv}>
          <h2 className={classes.title}>Categories</h2>
          <FixedSizeList
            className={classes.listBox}
            height={200}
            width={360}
            itemSize={46}
            itemCount={categories.length}
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
    categories: state.CategoriesReducer.categories,
    selectCatItem: state.CategoriesReducer.selectCatItem
  };
};
export default connect(mapStateToProps)(withStyles(styles)(Categories));
