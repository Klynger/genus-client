import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';

class ImageUploader extends Component {
  get fullSrc() {
    const { path, mimeType, imgSrc } = this.props;

    if (mimeType && imgSrc) {
      return `${mimeType}${imgSrc}`; // TODO
    }

    return path;
  }

  render() {
    const { alt, className, initials, style } = this.props;

    if (initials) {
      return (
        <Avatar style={style} alt={alt} className={className}>
          {initials}
        </Avatar>
      );
    }
    return <Avatar alt={alt} style={style} src={this.fullSrc} className={className} />;
  }
}

ImageUploader.defaultProps = {
  // editable: false, TODO
};

ImageUploader.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  // editable: PropTypes.bool,
  imgSrc: PropTypes.string,
  initials: (props, propName, componentName) => {
    let result = null;
    const prop = props[propName];

    if (
      typeof prop !== 'undefined' &&
      (typeof prop !== 'string' || prop.length === 0 || prop.length > 2)
    ) {
      result = new Error(
        `Invalid prop \`${propName}supplied to` +
          ` \`${componentName}\`. Validation failed.` +
          ` You must pass a string with 0 < ${propName}.length <= 2.`,
      );
    }
    return result;
  },
  mimeType: PropTypes.string,
  path: PropTypes.string,
  style: PropTypes.object,
};

export default ImageUploader;
