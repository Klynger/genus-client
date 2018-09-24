import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Paper, Typography, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import styled from 'styled-components';

const ContentContainer = styled.div`
  bakcground-color: inherit;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 7px;
`;

const InstitutionInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const photoDimension = '140px';

const contentContainerBreakpoints = theme => ({
  [theme.breakpoints.down('sm')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
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
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '75%',
  },
});

const DetailsPage = ({ classes, institution }) => {
  let toRender;
  const institution1 = { // TIRAR ISSO DAQUI
    name: 'UFCG@Bodocongo',
    email: 'ufcg@ufcg.com.br',
    phone: 'ufcg@ufcg.com.br',
    address: 'rua aprigio veloso',
  };
  if (!institution) { // TIRAR A NEGAÇÃO
    toRender = (
      <Paper className={classes.root}>
        <ContentContainer>
          <img
            alt="Institution"
            className={classes.photo}
            src="https://s3.amazonaws.com/tinycards/image/f8bda7d1c863b4f42adf2d1e5d72ff14" />
          <InstitutionInfos className={classes.institutionInfos}>
            <Typography
              variant="title"
              gutterBottom
            >
                {institution1.name}
            </Typography>
            <Typography
              variant="subheading"
              gutterBottom
            >
                Email: {institution1.email}
            </Typography>
            <Typography
              variant="subheading"
              gutterBottom
            >
                Telefone: {institution1.phone}
            </Typography>
            <Typography
              variant="subheading"
            >
                Endereço: {institution1.address}
            </Typography>
          </InstitutionInfos>
        </ContentContainer>
      </Paper>
    );
  } else {
    toRender = <p>Não há nenhuma instituição selecionada</p>;
  }

  return (
    <Fade in>
      {toRender}
    </Fade>
  );
};

DetailsPage.propTypes = {
  classes: PropTypes.object,
  institution: PropTypes.shape({
    address: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
  }),
};

function mapStateToProps({ institution }) {
  return {
    institution: institution.byId[institution.selectedInstitution],
  };
}

export default connect(mapStateToProps)(withStyles(styles)(DetailsPage));
