import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubjectForm from '../SubjectForm';
import { Fade, Paper, Typography, withStyles, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ActionsContainer } from '../../utils/SharedComponents';
import GradesGrid from './GradesGrid';

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
  button: {
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
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
  detailsPageContentContainer: {
    display: 'flex',
    margin: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  detailsPagePaper: {
    borderRadius: 0,
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  detailsPageRoot: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '85%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '70%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '60%',
    },
  },
});

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectOpen: false,
    };

    this.handleSubjectOpen = this.handleSubjectOpen.bind(this);
  }

  handleSubjectOpen() {
    this.setState(prevState => ({ subjectOpen: !prevState.subjectOpen }));
  }

  render() {
    const { classes, institution } = this.props;
    const { subjectOpen } = this.state;
    let toRender;

    if (institution) {
      toRender = (
        <div className={classes.detailsPageRoot}>
          <SubjectForm
            open={subjectOpen}
            onClose={this.handleSubjectOpen}
          />
          <Paper className={classes.detailsPagePaper}>
            <div className={classes.detailsPageContentContainer}>
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
                  gutterBottom
                  variant="subheading"
                >
                  Endereço: {institution.address}
                </Typography>
              </InstitutionInfos>
            </div>
          </Paper>
          <ActionsContainer>
            <Button
              className={classes.button}
              color="primary"
              onClick={this.handleSubjectOpen}
              variant="contained"
              disabled={institution.grades.length === 0}
              size="small"
            >
              Criar Disciplina
            </Button>
          </ActionsContainer>
          <GradesGrid />
        </div>
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
  classes: PropTypes.object.isRequired,
  institution: PropTypes.shape({
    address: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }),
};

function mapStateToProps({ institution }) {
  const { selectedInstitution } = institution;
  if (institution.byId[selectedInstitution]) {
    return {
      institution: institution.byId[selectedInstitution],
    };
  }
  return {};
}

export default connect(mapStateToProps)(
  withStyles(styles)(DetailsPage));
