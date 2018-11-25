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

const GradeInfoMenu = ({ id, open, classes, onClose, anchorEl, onAddStudends, canAddStudents }) => {
  return (
    <Popper anchorEl={anchorEl} className={classes.popper} open={open} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          id={id}
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList>
                {canAddStudents && (
                  <MenuItem
                    onClick={e => {
                      if (onAddStudends) {
                        onAddStudends();
                      }
                      onClose(e);
                    }}
                  >
                    Adicionar estudante
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
  classes: PropTypes.object.isRequired,
  onAddStudends: PropTypes.func,
  open: PropTypes.bool,
};

export default withStyles(styles)(GradeInfoMenu);
