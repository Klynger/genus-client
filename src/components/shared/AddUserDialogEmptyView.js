import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { DialogContent, DialogActions, Typography, Button } from '@material-ui/core';

const AddUserDialogEmptyView = ({ onActionClick, children }) => {
  return (
    <Fragment>
      <DialogContent>
        <Typography>{children}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onActionClick}>
          Ok
        </Button>
      </DialogActions>
    </Fragment>
  );
};

AddUserDialogEmptyView.propTypes = {
  children: PropTypes.string.isRequired,
  onActionClick: PropTypes.func.isRequired,
};

export default AddUserDialogEmptyView;
