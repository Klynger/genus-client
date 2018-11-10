import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = ({ spacing: { unit } }) => ({
  root: {
    '@media screen and (min-width: 1920px)': {
      width: `calc(50% - ${unit * 2}px)`,
    },
    '@media screen and (min-width: 1280px) and (max-width: 1919px)': {
      width: `calc(60% - ${unit * 2}px)`,
    },
    '@media screen and (min-width: 960px) and (max-width: 1279px)': {
      width: `calc(70% - ${unit * 2}px)`,
    },
    '@media screen and (min-width: 700px) and (max-width: 959px)': {
      width: `calc(80% - ${unit * 2}px)`,
    },
    '@media screen and (min-width: 600px) and (max-width: 699px)': {
      width: `calc(85% - ${unit * 2}px)`,
    },
    '@media screen and (max-width: 599px)': {
      width: `calc(95% - ${unit * 2}px)`,
    },
  },
});

const DefaultContainerRoute = ({
  classes,
  children,
  className,
  component: Component,
  ...other
}) => (
  <Component className={classNames(classes.root, className)} {...other}>
    {children}
  </Component>
);

DefaultContainerRoute.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
};

DefaultContainerRoute.defaultProps = {
  component: 'div',
};

export default withStyles(styles)(DefaultContainerRoute);
