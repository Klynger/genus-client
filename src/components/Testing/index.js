import Image from './Image';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});

class Testing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      src: null,
    };
  }

  handleImageChange = base64 => {
    this.setState({ src: base64 });
  };

  render() {
    const { classes } = this.props;
    const { src } = this.state;

    return (
      <div className={classes.root}>
        <Image src={src} alt="Test" onImageChange={this.handleImageChange} />
      </div>
    );
  }
}

Testing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Testing);
