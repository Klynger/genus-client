import React from 'react';
import PropTypes from 'prop-types';
import InstitutionForm from './InstitutionForm';
import { withStyles } from '@material-ui/core/styles';
import DefaultContainerRoute from '../../shared/DefaultContainerRoute';
import { Typography, Divider, Fade, withWidth } from '@material-ui/core';

const styles = theme => ({
  divider: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
});

const titleVariant = {
  xs: 'display1',
  sm: 'display2',
  md: 'display2',
  lg: 'display3',
  xl: 'display3',
};

const CreateInstitution = ({ classes, width }) => {
  return (
    <Fade in>
      <DefaultContainerRoute>
        <Typography variant={titleVariant[width]}>CRIAR NOVA INSTITUIÇÃO</Typography>
        <Divider className={classes.divider} />
        <InstitutionForm />
      </DefaultContainerRoute>
    </Fade>
  );
};

CreateInstitution.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default withStyles(styles)(withWidth()(CreateInstitution));
