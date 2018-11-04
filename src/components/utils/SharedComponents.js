import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Button, withWidth, Typography, Grow } from '@material-ui/core';

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

export const DefaultDialogTransition = props => <Grow in {...props} />;

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
  xs: 'h5',
  sm: 'h4',
  md: 'h4',
  lg: 'h3',
  xl: 'h3',
};

const titleVariants = {
  xs: 'h4',
  sm: 'h3',
  md: 'h3',
  lg: 'h2',
  xl: 'h2',
};

export const Title = (variants, component) =>
  withWidth()(
    withStyles(styles)(({ children, classes, width }) => (
      <Typography className={classes.title} variant={variants[width]} component={component}>
        {children}
      </Typography>
    )),
  );
Title.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.object,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  width: PropTypes.string,
};

Title.defaultProps = {
  component: 'h1',
};

export const ResponsiveTitle = Title(titleVariants);
export const ResponsiveSubTitle = Title(subTitleVariants, 'h2');
// ----------------------------------------------------------
