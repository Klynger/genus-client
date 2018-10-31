import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { DialogContent, DialogActions, Typography, Button } from '@material-ui/core';

const AddTeacherEmptyView = ({ onDialogCloseClick }) => (
  <Fragment>
    <DialogContent>
      <Typography>Não há nenhum professor cadastrado nessa instituição</Typography>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={onDialogCloseClick}>
        Ok
      </Button>
    </DialogActions>
  </Fragment>
);

AddTeacherEmptyView.propTypes = {
  onDialogCloseClick: PropTypes.func.isRequired,
};

export default AddTeacherEmptyView;
