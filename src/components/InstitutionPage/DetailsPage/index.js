import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fade, Paper, Typography, withStyles, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 75%
  flex-wrap: wrap;
`;

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
  button: {
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
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
    width: '100%',
  },
});

class DetailsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gradeButtonOpen: false,
      subjectButtonOpen: false,
    };

    this.handleGradeButtonOpen = this.handleGradeButtonOpen.bind(this);
    this.handleSubjectButtonOpen = this.handleSubjectButtonOpen.bind(this);
  }

  handleGradeButtonOpen() {
    this.setState(prevState => ({ gradeButtonOpen: !prevState.gradeButtonOpen }));
  }

  handleSubjectButtonOpen() {
    this.setState(prevState => ({ subjectButtonOpen: !prevState.subjectButtonOpen }));
  }

  render() {
    const { classes, institution } = this.props;
    let toRender;

    if (institution) { // TIRAR A NEGAÇÃO
      toRender = (
        <Wrapper>
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
                  {institution.name}
                </Typography>
                <Typography
                  variant="subheading"
                  gutterBottom
                >
                  Email: {institution.email}
                </Typography>
                <Typography
                  variant="subheading"
                  gutterBottom
                >
                  Telefone: {institution.phone}
                </Typography>
                <Typography
                  variant="subheading"
                >
                  Endereço: {institution.address}
                </Typography>
              </InstitutionInfos>
            </ContentContainer>
          </Paper>
          <Button
            className={classes.button}
            color="primary"
            onClick={this.handleGradeButtonOpen}
            variant="contained"
            size="small"
          >
            Criar Série
          </Button>
          <Button
            className={classes.button}
            color="primary"
            onClick={this.handleSubjectButtonOpen}
            variant="contained"
            size="small"
          >
            Criar Disciplina
          </Button>
        </Wrapper>
      );
    } else {
      toRender = <p>Não há nenhuma instituição selecionada</p>;
    }

    return (
      <Fade in>
        {toRender}
      </Fade>
    );
  }
}

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
