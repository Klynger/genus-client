import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const itemWidth = 240;

const styles = () => ({
  item: {
    width: itemWidth,
  },
});

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.handleGoToPath = this.handleGoToPath.bind(this);
  }

  handleGoToPath(path = '/') {
    this.props.onDrawerToggle();
    this.props.history.push(path);
  }

  render() {
    const { classes } = this.props;
    return (
      <List>
        <ListItem className={classes.item} button onClick={() => this.handleGoToPath()}>
         <ListItemIcon>
           <HomeIcon />
         </ListItemIcon>
         <ListItemText primary="Home" />
        </ListItem>
      </List>
    );
  }
}

DrawerContent.propTypes = {
 classes: PropTypes.object,
 history: PropTypes.object,
 onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(withRouter(DrawerContent));
