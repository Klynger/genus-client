import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import AddTeacherEmptyView from './AddTeacherEmptyView';
import { capitalize } from '@material-ui/core/utils/helpers';
import { defaultDialogBreakpoints } from '../../../../../utils/helpers';
import { DefaultDialogTransition } from '../../../../../utils/SharedComponents';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, withStyles,
  withMobileDialog,
} from '@material-ui/core';

const styles = () => ({
  ...defaultDialogBreakpoints(),
});

class AddTeacherDialog extends Component {
  componentDidMount() {

  }

  render() {
    const {
      open, subject, teachers,
      onDialogCloseClick, classes, width,
      fullScreen,
    } = this.props;

    return (
      <Dialog
        open={open}
        fullScreen={fullScreen}
        onClose={onDialogCloseClick}
        TransitionComponent={DefaultDialogTransition}
        classes={{
          paper: classes[`dialogRoot${capitalize(width)}`],
        }}
      >
        <DialogTitle>
          {subject.name}
        </DialogTitle>
        {teachers.length === 0 ?
          <AddTeacherEmptyView
            onDialogCloseClick={onDialogCloseClick}
          />
          :
          <Fragment>
            <DialogContent>
              There is some professors
            </DialogContent>
            <DialogActions>
            <Button
                color="primary"
                onClick={onDialogCloseClick}
              >
                Cancelar
            </Button>
              <Button
                color="primary"
                onClick={() => null}
              >
                Adicionar
              </Button>
            </DialogActions>
          </Fragment>
        }
      </Dialog>
    );
  }
}

AddTeacherDialog.defaultProps = {
  open: false,
  teachers: [],
};

AddTeacherDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  onDialogCloseClick: PropTypes.func.isRequired,
  open: PropTypes.bool,
  subject: PropTypes.object.isRequired,
  teachers: PropTypes.array,
  width: PropTypes.string.isRequired,
};

function mapToProps({ institution, user }) {
  const { selectedInstitution } = institution;
  if (institution.byId[selectedInstitution]) {
    let teachers;
    if (institution.byId[selectedInstitution].teachers) {
      teachers = institution.byId[selectedInstitution].teachers
      .map(id => user.byId[id]);
    } else {
      teachers = institution.byId[selectedInstitution].teacherList
          .map(id => user.byId[id]);
    }
    return { teachers };
  }
  return {};
}

export default withMobileDialog({
  breakpoint: 'xs',
})(withStyles(styles)(
  connect(mapToProps)(AddTeacherDialog)));
