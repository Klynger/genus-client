import PropTypes from 'prop-types';
import GradeInfoMenu from './GradeInfoMenu';
import { MoreVert } from '@material-ui/icons';
import React, { Component, Fragment } from 'react';
import { DEFAULT_PHOTO_CLASS_SRC } from '../../../utils/helpers';
import { Paper, Typography, withStyles, IconButton } from '@material-ui/core';

const PHOTO_DIMENSION = 250;

const styles = theme => ({
  photo: {
    borderTopLeftRadius: theme.shape.borderRadius,
    height: '100%',
    minHeight: 123,
    width: PHOTO_DIMENSION,
    [theme.breakpoints.down('xs')]: {
      borderTopRightRadius: theme.shape.borderRadius,
    },
    [theme.breakpoints.up('sm')]: {
      borderBottomLeftRadius: theme.shape.borderRadius,
    },
  },
  root: {
    display: 'flex',
    padding: theme.spacing.unit,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: theme.spacing.unit,
  },
  infoText: {
    margin: 0,
  },
  menuIcon: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: 0,
    top: 0,
    height: 48,
    width: 48,
  },
});

class GradeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
    };
  }

  handleMenuToggle = () => {
    this.setState(({ openMenu }) => ({ openMenu: !openMenu }));
  };

  handleMenuClose = e => {
    if (this.menuAnchorEl.contains(e.target)) {
      return;
    }

    this.setState({ openMenu: false });
  };

  render() {
    const { grade } = this.props;

    if (grade) {
      const {
        classes,
        canAddStudents,
        onAddStudents,
        canSendEmailToGradeStudents,
        onSendEmailOpen,
      } = this.props;
      const { openMenu } = this.state;

      const showMenuButton = canAddStudents;
      const showEmailButton = canSendEmailToGradeStudents;
      return (
        <Fragment>
          <GradeInfoMenu
            open={openMenu}
            id={this.menuId}
            anchorEl={this.menuAnchorEl}
            onClose={this.handleMenuClose}
            canAddStudents={canAddStudents}
            onAddStudents={onAddStudents}
            onSendEmailOpen={onSendEmailOpen}
            canSendEmailToGradeStudents={canSendEmailToGradeStudents}
          />
          <Paper className={classes.root}>
            {(showMenuButton || showEmailButton) && (
              <IconButton
                aria-haspopup="true"
                className={classes.menuIcon}
                onClick={this.handleMenuToggle}
                aria-owns={openMenu ? this.menuId : undefined}
                buttonRef={node => {
                  this.menuAnchorEl = node;
                }}
              >
                <MoreVert />
              </IconButton>
            )}
            <img
              className={classes.photo}
              alt={`Foto da turma ${grade.name}`}
              src={grade.photo || DEFAULT_PHOTO_CLASS_SRC}
            />
            <div className={classes.infoContainer}>
              <Typography className={classes.infoText} component="h2" variant="h6" gutterBottom>
                {grade.name}
              </Typography>
              <Typography
                className={classes.infoText}
                component="h3"
                variant="subtitle1"
                gutterBottom
              >
                35 alunos
              </Typography>
            </div>
          </Paper>
        </Fragment>
      );
    }
    return null;
  }
}

GradeInfo.defaultProps = {
  canAddStudents: false,
};

GradeInfo.propTypes = {
  canAddStudents: PropTypes.bool,
  canSendEmailToGradeStudents: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  grade: PropTypes.shape({
    name: PropTypes.string,
  }),
  onAddStudents: PropTypes.func.isRequired,
  onSendEmailOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(GradeInfo);
