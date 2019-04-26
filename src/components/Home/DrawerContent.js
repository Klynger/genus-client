import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AddBox, Flight, Home, School } from '@material-ui/icons';
import { List, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';

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
    const { classes, userRole } = this.props;
    return (
      <List>
        <ListItem className={classes.item} button onClick={() => this.handleGoToPath()}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Página Inicial" />
        </ListItem>
        <ListItem
          className={classes.item}
          button
          onClick={() => this.handleGoToPath('/institution/details')}
        >
          <ListItemIcon>
            <School />
          </ListItemIcon>
          <ListItemText primary="Instituição" />
        </ListItem>
        {userRole === 'ADMIN' && (
          <ListItem
            className={classes.item}
            button
            onClick={() => this.handleGoToPath('/institution/new')}
          >
            <ListItemIcon>
              <AddBox />
            </ListItemIcon>
            <ListItemText primary="Criar Instituição" />
          </ListItem>
        )}
        {process.env.NODE_ENV === 'development' && (
          <ListItem className={classes.item} button onClick={() => this.handleGoToPath('/testing')}>
            <ListItemIcon>
              <Flight />
            </ListItemIcon>
            <ListItemText primary="Test" />
          </ListItem>
        )}
      </List>
    );
  }
}

DrawerContent.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  onDrawerToggle: PropTypes.func.isRequired,
  userRole: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(withRouter(DrawerContent));
