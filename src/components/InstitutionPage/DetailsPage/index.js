import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fade, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import GradesGrid from './GradesGrid';
import CreateEntryCodeDialog from '../EntryCode/CreateEntryCodeDialog';
import DisplayCodeDialog from '../EntryCode/DisplayCodeDialog';
import EmployeeList from './EmployeeList';
import InstitutionInfos from './InstitutionInfo';

const styles = theme => ({
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
      entryCodeCreateOpen: false,
      currentGeneratedCode: null,
      displayCodeOpen: false,
    };
  }

  handleDisplayCodeOpenToggle = () => {
    this.setState(({ displayCodeOpen }) =>
      ({ displayCodeOpen: !displayCodeOpen }));
  }

  handleCreateEntryOpenToggle = (currentGeneratedCode = null) => {
    if (currentGeneratedCode && typeof currentGeneratedCode === 'string') {
      this.setState({
        entryCodeCreateOpen: false,
        displayCodeOpen: true,
        currentGeneratedCode,
      });
    } else {
      this.setState(({ entryCodeCreateOpen }) => ({
        entryCodeCreateOpen: !entryCodeCreateOpen,
      }));
    }
  }

  render() {
    const { classes, institution } = this.props;
    const {
      entryCodeCreateOpen, displayCodeOpen,
      currentGeneratedCode,
    } = this.state;
    let toRender;

    if (institution) {
      toRender = (
        <div className={classes.detailsPageRoot}>
          <DisplayCodeDialog
            open={displayCodeOpen}
            code={currentGeneratedCode}
            onClose={this.handleDisplayCodeOpenToggle}
          />
          <CreateEntryCodeDialog
            open={entryCodeCreateOpen}
            onClose={this.handleCreateEntryOpenToggle}
          />
          <InstitutionInfos
            institution={institution}
            onHandleCreateEntryOpenToggle={this.handleCreateEntryOpenToggle}
          />
          <GradesGrid />
          <EmployeeList employees={institution.teachers} headTitle="Professores" />
          <EmployeeList employees={institution.admins} headTitle="Administradores" />
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
    admins: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })),
    email: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    teachers: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })),
  }),
};

function mapStateToProps({ institution, user }) {
  const { selectedInstitution } = institution;
  if (institution.byId[selectedInstitution]) {
    return {
      institution: {
        ...institution.byId[selectedInstitution],
        admins: institution.byId[selectedInstitution].admins.map(id => user.byId[id]),
        teachers: institution.byId[selectedInstitution].teachers.map(id => user.byId[id]),
      },
    };
  }
  return {};
}

export default connect(mapStateToProps)(
  withStyles(styles)(DetailsPage));
