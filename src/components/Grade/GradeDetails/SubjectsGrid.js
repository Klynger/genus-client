import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GridCard from '../../shared/GridCard';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import GridButton from '../../shared/GridButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { defaultImagesPaths } from '../../../utils/constants';
import CreateSubjectDialog from '../../Institution/CreateSubjectDialog';
import { GridContainer, ResponsiveSubTitle } from '../../shared/SharedComponents';

const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '97%',
  },
});

class SubjectsGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjectDialogOpen: false,
    };
  }

  goToSubject = id => {
    const {
      push,
      location: { pathname },
    } = this.props.history;
    push(`${pathname}/subject/${id}`);
  };

  handleSubjectDialogToggle = () => {
    this.setState(({ subjectDialogOpen }) => ({
      subjectDialogOpen: !subjectDialogOpen,
    }));
  };

  render() {
    const { gradeId, subjects, userRole, classes } = this.props;
    const { subjectDialogOpen } = this.state;

    return (
      <div className={classes.container}>
        <ResponsiveSubTitle>Disciplinas</ResponsiveSubTitle>
        <CreateSubjectDialog
          gradeId={gradeId}
          open={subjectDialogOpen}
          onClose={this.handleSubjectDialogToggle}
        />
        <GridContainer>
          {subjects.map(({ id, name, mimeType, photo }) => (
            <GridCard
              key={id}
              title={name}
              imgAlt={name}
              onClick={() => this.goToSubject(id)}
              imgSrc={mimeType && photo ? `${mimeType},${photo}` : defaultImagesPaths.SUBJECT}
            />
          ))}
          {userRole === 'ADMIN' && (
            <GridButton key="-10" Icon={AddCircleIcon} onClick={this.handleSubjectDialogToggle} />
          )}
        </GridContainer>
      </div>
    );
  }
}

SubjectsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  gradeId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  subjects: PropTypes.arrayOf(PropTypes.object),
  userRole: PropTypes.string.isRequired,
};

SubjectsGrid.subjects = {
  subjects: [],
};

export default withStyles(styles)(withRouter(SubjectsGrid));
