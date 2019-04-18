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

const GradeInfoMenu = ({
  id,
  open,
  classes,
  onClose,
  anchorEl,
  canEditGrade,
  onAddStudents,
  canAddStudents,
  onSendEmailOpen,
  onEditGradeOpen,
  canSendEmailToGradeStudents,
}) => {
  return (
    <Popper
      anchorEl={anchorEl}
      className={classes.popper}
      placement="bottom-end"
      open={open}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          id={id}
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'right bottom' : 'right top' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList>
                {canEditGrade && (
                  <MenuItem
                    onClick={e => {
                      onEditGradeOpen();
                      onClose(e);
                    }}
                  >
                    Editar informações
                  </MenuItem>
                )}
                {canAddStudents && (
                  <MenuItem
                    onClick={e => {
                      if (onAddStudents) {
                        onAddStudents();
                      }
                      onClose(e);
                    }}
                  >
                    Adicionar estudante
                  </MenuItem>
                )}
                {canSendEmailToGradeStudents && (
                  <MenuItem
                    onClick={e => {
                      onSendEmailOpen();
                      onClose(e);
                    }}
                  >
                    Enviar email
                  </MenuItem>
                )}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

GradeInfoMenu.defaultProps = {
  open: false,
};

GradeInfoMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  canAddStudents: PropTypes.bool,
  canEditGrade: PropTypes.bool,
  canSendEmailToGradeStudents: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  onAddStudents: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  onEditGradeOpen: PropTypes.func.isRequired,
  onSendEmailOpen: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default withStyles(styles)(GradeInfoMenu);
