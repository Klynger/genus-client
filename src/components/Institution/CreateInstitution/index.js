import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InstitutionForm from './InstitutionForm';
import { Typography, Divider, Fade, withWidth } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1200px) {
    width: 60%;
  }

  @media screen and (min-width: 900px) and (max-width: 1199px) {
    width: 70%;
  }

  @media screen and (min-width 700px) and (max-width: 899px) {
    width: 80%;
  }

  @media screen and (max-width: 699px) {
    width: 95%;
  }
`;

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
      <CreateContainer>
        <Typography variant={titleVariant[width]}>CRIAR NOVA INSTITUIÇÃO</Typography>
        <Divider className={classes.divider} />
        <InstitutionForm />
      </CreateContainer>
    </Fade>
  );
};

CreateInstitution.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default withStyles(styles)(withWidth()(CreateInstitution));
