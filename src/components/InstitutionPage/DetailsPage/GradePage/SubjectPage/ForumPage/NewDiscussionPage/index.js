import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { Component } from 'react';
import {
  Paper,
  TextField,
  withStyles,
} from '@material-ui/core';

const Container = styled(Paper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: ${({ unit }) => unit || 8}px;

  @media screen and (min-width: 1920px) {
    width: calc(50% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (min-width: 1280px) and (max-width: 1919px) {
    width: calc(60% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (min-width: 960px) and (max-width: 1279px) {
    width: calc(70% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (min-width: 700px) and (max-width: 959px) {
    width: calc(80% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (min-width: 600px) and (max-width: 699px) {
    width: calc(85% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (max-width: 599px) {
    width: calc(95% - ${({ unit }) => (unit || 8) * 2}px);
  }
`;

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
});

class NewDiscussionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: 'Rafael',
    };
  }

  handleChange = e => {
    this.setState({
      content: e.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { content } = this.state;

    return (
      <Container className={classes.root}>
        <TextField value={content} onChange={this.handleChange} />
      </Container>
    );
  }
}

NewDiscussionPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewDiscussionPage);
