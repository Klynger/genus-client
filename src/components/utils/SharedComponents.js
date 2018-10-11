import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, withWidth, Typography,
  Grow,
} from '@material-ui/core';
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

FadeInButton.defaultProps = {
  delay: 700,
};

FadeInButton.propTypes = {
  delay: PropTypes.number,
};

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const DefaultDialogTransition = props => (
  <Grow in {...props} />
);

export const GridContainer = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-gap: 6px;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));

  &:before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

// -------------------------------------------------------
const styles = theme => ({
  title: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
});

const subTitleVariants = {
  xs: 'headline',
  sm: 'display1',
  md: 'display1',
  lg: 'display2',
  xl: 'display2',
};

const titleVariants = {
  xs: 'display1',
  sm: 'display2',
  md: 'display2',
  lg: 'display3',
  xl: 'display3',
};

export const Title = (variants, component) => (withWidth()(withStyles(styles)(
  ({ children, classes, width }) => (
  <Typography
    className={classes.title}
    variant={variants[width]}
    component={component}
  >
    {children}
  </Typography>
))));
Title.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.object,
  component: PropTypes.string,
  width: PropTypes.string,
};

Title.defaultProps = {
  component: 'h1',
};

export const ResponsiveTitle = Title(titleVariants);
export const ResponsiveSubTitle = Title(subTitleVariants, 'h2');
// ----------------------------------------------------------
