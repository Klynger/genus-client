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

const InstitutionInfoMenu = ({
  id,
  open,
  classes,
  onClose,
  anchorEl,
  canUpdateInfo,
  canGenerateCode,
  canSendEmail,
  onGenerateCodeOpen,
  onSendEmailOpen,
  onUpdateInstitutionOpen,
}) => {
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
                {canUpdateInfo && (
                  <MenuItem
                    onClick={e => {
                      onUpdateInstitutionOpen();
                      onClose(e);
                    }}
                  >
                    Atualizar Informações
                  </MenuItem>
                )}
                {canGenerateCode && (
                  <MenuItem
                    onClick={e => {
                      onGenerateCodeOpen();
                      onClose(e);
                    }}
                  >
                    Gerar código de vínculo
                  </MenuItem>
                )}
                {canSendEmail && (
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

InstitutionInfoMenu.defaultProps = {
  open: false,
};

InstitutionInfoMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  canGenerateCode: PropTypes.bool,
  canSendEmail: PropTypes.bool,
  canUpdateInfo: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onGenerateCodeOpen: PropTypes.func.isRequired,
  onSendEmailOpen: PropTypes.func.isRequired,
  onUpdateInstitutionOpen: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default withStyles(styles)(InstitutionInfoMenu);
