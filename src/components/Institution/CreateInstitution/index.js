import React from 'react';
import PropTypes from 'prop-types';
import InstitutionForm from './InstitutionForm';
import { Divider, Fade } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ResponsiveTitle } from '../../shared/SharedComponents';
import DefaultContainerRoute from '../../shared/DefaultContainerRoute';

const styles = theme => ({
  divider: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
});

const CreateInstitution = ({ classes }) => {
  return (
    <Fade in>
      <DefaultContainerRoute>
        <ResponsiveTitle>CRIAR NOVA INSTITUIÇÃO</ResponsiveTitle>
        <Divider className={classes.divider} />
        <InstitutionForm />
      </DefaultContainerRoute>
    </Fade>
  );
};

CreateInstitution.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateInstitution);
