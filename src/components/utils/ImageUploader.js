import PropTypes from 'prop-types';
import React, { Component } from 'react';
import deepOrange from '@material-ui/core/colors/deepOrange';
import {
  Avatar,
  withStyles,
} from '@material-ui/core';

const styles = () => ({
  avatar: {
    backgroundColor: deepOrange.A400,
    fontSize: '4.25rem',
    height: 140,
    width: 140,
  },
});

class ImageUploader extends Component {
  get fullSrc() {
    const {
      path, mimeType, imgSrc,
    } = this.props;

    if (mimeType && imgSrc) {
      return `${mimeType}${imgSrc}`; // TODO
    }

    return path;
  }

  render() {
    const { alt, classes, initials } = this.props;

    if (initials) {
      return (
        <Avatar className={classes.avatar}>{initials}</Avatar>
      );
    }
    return (
      <Avatar
        alt={alt}
        src={this.fullSrc}
        className={classes.avatar}
      />
    );
  }
}

ImageUploader.defaultProps = {
  // editable: false, TODO
};

ImageUploader.propTypes = {
  alt: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  // editable: PropTypes.bool,
  imgSrc: PropTypes.string,
  initials: (props, propName, componentName) => {
    let result = null;
    const prop = props[propName];

    if (typeof prop !== 'undefined' && (typeof prop !== 'string'
      || prop.length === 0 || prop.length > 2)) {
        result = new Error(`Invalid prop \`${propName}supplied to` +
        ` \`${componentName}\`. Validation failed.` +
        ` You must pass a string with 0 < ${propName}.length <= 2.`);
    }
    return result;
  },
  mimeType: PropTypes.string,
  path: PropTypes.string,
};

export default withStyles(styles)(ImageUploader);
