import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  withMobileDialog,
  withStyles,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';
import { DefaultDialogTransition } from '../../utils/SharedComponents';
import { defaultDialogBreakpoints } from '../../utils/helpers';
import { capitalize } from '@material-ui/core/utils/helpers';
import { connect } from 'react-redux';

const styles = () => ({
  ...defaultDialogBreakpoints(),
});

const SubjectDialog = ({ classes, fullScreen, gradeName, open, onClose, subjects, width }) => (
  <Dialog
    fullScreen={fullScreen}
    open={open}
    onClose={onClose}
    TransitionComponent={DefaultDialogTransition}
    classes={{
      paper: classes[`dialogRoot${capitalize(width)}`],
    }}
  >
    <DialogTitle>{gradeName}</DialogTitle>
    <DialogContent>
      <List>
        {subjects.map(subject => (
          <ListItem key={subject.id} disableGutters>
            <ListItemText primary={subject.name} />
          </ListItem>
        ))}
        {subjects.length === 0 && <Typography>Série ainda não possui disciplinas.</Typography>}
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Fechar</Button>
    </DialogActions>
  </Dialog>
);

SubjectDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  gradeId: PropTypes.string.isRequired, // eslint-disable-line
  gradeName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  subjects: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired,
};

function mapStateToProps({ grade, subject }, { gradeId }) {
  const selectedGrade = { ...grade.byId[gradeId] };
  const gradeSubjects = [...selectedGrade.subjects];
  return {
    gradeName: selectedGrade.name,
    subjects: gradeSubjects.map(id => subject.byId[id]),
  };
}

export default withStyles(styles)(withMobileDialog()(connect(mapStateToProps)(SubjectDialog)));
