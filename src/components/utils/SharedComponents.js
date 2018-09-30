import React from 'react';
import PropTypes from 'prop-types';
import { Button, withWidth, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const FadeInButton = styled(Button)`
  animation: fadeIn ${({ delay }) => delay * 2}ms;
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

FadeInButton.defaultProps = {
  delay: 700,
};

FadeInButton.propTypes = {
  delay: PropTypes.number,
};

const titleVariant = {
  xs: 'display1',
  sm: 'display2',
  md: 'display2',
  lg: 'display3',
  xl: 'display3',
};

const styles = theme => ({
  title: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
});

export const ResponsiveTitle = withWidth()(withStyles(styles)(
  ({ children, classes, width }) => (
  <Typography
    className={classes.title}
    variant={titleVariant[width]}
  >
    {children}
  </Typography>
)));

ResponsiveTitle.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.object,
  width: PropTypes.string,
};
