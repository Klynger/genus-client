import React from 'react';
import {
  Button,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ActionsContainer } from '../../utils/SharedComponents';

const photoDimension = '140px';

const InstitutionInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
`;

const contentContainerBreakpoints = theme => ({
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing.unit * 3,
  },
});

const styles = theme => ({
  institutionInfos: {
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    ...contentContainerBreakpoints(theme),
  },
  photo: {
    height: photoDimension,
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    width: photoDimension,
    ...contentContainerBreakpoints(theme),
  },
  detailsPageContentContainer: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  detailsPagePaper: {
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit,
    width: `calc(100% - ${theme.spacing.unit * 2}px)`,
  },
  actionsDetailsButton: {
    marginLeft: theme.spacing.unit,
  },
});

const InstitutionInfo = ({ classes, onHandleCreateEntryOpenToggle, institution }) => (
  <Paper className={classes.detailsPagePaper}>
    <div className={classes.detailsPageContentContainer}>
      <img
        alt="Institution"
        className={classes.photo}
        src="https://s3.amazonaws.com/tinycards/image/f8bda7d1c863b4f42adf2d1e5d72ff14" />
      <InstitutionInfos className={classes.institutionInfos}>
        <Typography
          variant="h6"
          gutterBottom
        >
          {institution.name}
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
        >
          Email: {institution.email}
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
        >
          Telefone: {institution.phone}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle1"
        >
          Endereço: {institution.address}
        </Typography>
      </InstitutionInfos>
    </div>
    <ActionsContainer>
      <Button
        className={classes.actionsDetailsButton}
        color="primary"
        onClick={onHandleCreateEntryOpenToggle}
      >
        Gerar Código de Vínculo
      </Button>
    </ActionsContainer>
  </Paper>
);

InstitutionInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  institution: PropTypes.shape({
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  onHandleCreateEntryOpenToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(InstitutionInfo);
