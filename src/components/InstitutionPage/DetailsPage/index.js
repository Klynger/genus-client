import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fade, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import GradesGrid from './GradesGrid';
import CreateEntryCodeDialog from '../EntryCode/CreateEntryCodeDialog';
import DisplayCodeDialog from '../EntryCode/DisplayCodeDialog';
import EmployeeList from './EmployeeList';
import { requestGraphql } from '../../utils/HTTPClient';
import { getUsersFromInstitutionByRole } from '../../../queryGenerators/userQueries';
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
      teachers: [],
      admins: [],
    };
  }

  componentDidMount() {
    if (this.props.institution && this.props.institution.id) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.institution &&
      prevProps.institution &&
      this.props.institution.id !== prevProps.institution.id) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const teacherInput = {
      institutionId: this.props.institution.id,
      role: 'TEACHER',
    };
    requestGraphql(getUsersFromInstitutionByRole(teacherInput),
    localStorage.getItem('token'))
    .then(res => {
      if (res.data.data && res.data.data.getUsersFromInstitutionByRole) {
        this.setState({ teachers: [...res.data.data.getUsersFromInstitutionByRole] });
      } else {
        // TODO error treatment
      }
    })
    .catch();
    const adminInput = {
      institutionId: this.props.institution.id,
      role: 'ADMIN',
    };
    requestGraphql(getUsersFromInstitutionByRole(adminInput),
    localStorage.getItem('token'))
    .then(res => {
      if (res.data.data && res.data.data.getUsersFromInstitutionByRole) {
        this.setState({ admins: [...res.data.data.getUsersFromInstitutionByRole] });
      } else {
        // TODO error treatment
      }
    })
    .catch();
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
      currentGeneratedCode, teachers, admins,
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
          <EmployeeList employees={teachers} headTitle="Professores" />
          <EmployeeList employees={admins} headTitle="Administradores" />
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
    id: PropTypes.string,
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
