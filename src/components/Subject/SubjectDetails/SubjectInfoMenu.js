import React from 'react';
import PropTypes from 'prop-types';
import {
  Grow,
  Paper,
  Popper,
  MenuList,
  MenuItem,
  withStyles,
  ClickAwayListener,
} from '@material-ui/core';

const styles = () => ({
  popper: {
    zIndex: 10,
  },
});

const SubjectInfoMenu = ({
  id,
  open,
  classes,
  onClose,
  anchorEl,
  isAdmin,
  canSendEmail,
  onEditSubjectOpen,
  onAddTeacherOpen,
  onAddStudentOpen,
  onSendEmailOpen,
}) => {
  const close = (evt, func) => {
    func();
    onClose(evt);
  };

  return (
    <Popper
      placement="bottom-end"
      transition
      disablePortal
      open={open}
      anchorEl={anchorEl}
      className={classes.popper}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          id={id}
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList>
                {isAdmin && [
                  <MenuItem
                    key={'update-subject__info'}
                    onClick={evt => close(evt, onEditSubjectOpen)}
                  >
                    Atualizar Informações
                  </MenuItem>,
                  <MenuItem
                    key={'add-teacher-subject__info'}
                    onClick={evt => close(evt, onAddTeacherOpen)}
                  >
                    Vincular professor
                  </MenuItem>,
                  <MenuItem
                    key={'add-student-subject__info'}
                    onClick={evt => close(evt, onAddStudentOpen)}
                  >
                    Vincular aluno
                  </MenuItem>,
                ]}
                {canSendEmail && [
                  <MenuItem
                    key={'send-email-subject__info'}
                    onClick={evt => close(evt, onSendEmailOpen)}
                  >
                    Enviar Email
                  </MenuItem>,
                ]}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

SubjectInfoMenu.propTypes = {
  anchorEl: PropTypes.object,
  canSendEmail: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onAddStudentOpen: PropTypes.func.isRequired,
  onAddTeacherOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onEditSubjectOpen: PropTypes.func.isRequired,
  onSendEmailOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SubjectInfoMenu);
