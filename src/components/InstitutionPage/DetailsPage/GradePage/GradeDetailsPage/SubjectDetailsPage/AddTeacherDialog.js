import React from 'react';
import PropTypes from 'prop-types';
import AddTeacherEmptyView from './AddTeacherEmptyView';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { DefaultDialogTransition } from '../../../../../utils/SharedComponents';

const AddTeacherDialog = ({
  open, subject, teachers,
  onDialogCloseClick,
}) => (
  <Dialog
    open={open}
    onClose={onDialogCloseClick}
    TransitionComponent={DefaultDialogTransition}
  >
    <DialogTitle>
      {subject.name}
    </DialogTitle>
    {teachers.length === 0 ?
      <AddTeacherEmptyView
        onDialogCloseClick={onDialogCloseClick}
      />
      :
      <DialogContent>
        There is some professors
      </DialogContent>
    }
  </Dialog>
);

AddTeacherDialog.defaultProps = {
  open: false,
  teachers: [],
};

AddTeacherDialog.propTypes = {
  onDialogCloseClick: PropTypes.func.isRequired,
  open: PropTypes.bool,
  subject: PropTypes.object.isRequired,
  teachers: PropTypes.array,
};

export default AddTeacherDialog;
