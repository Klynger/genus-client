import PropTypes from 'prop-types';
import Image from '../../shared/Image';
import GradeInfoMenu from './GradeInfoMenu';
import { MoreVert } from '@material-ui/icons';
import React, { Component, Fragment } from 'react';
import { defaultImagesPaths } from '../../../utils/constants';
import { Paper, Typography, withStyles, IconButton } from '@material-ui/core';

const PHOTO_DIMENSION = 250;

const styles = theme => ({
  imageContainer: {
    borderTopLeftRadius: theme.shape.borderRadius,
    height: 160,
    minHeight: 150,
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

    this.menuId = 'grade-info__menu';
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
        userRole,
        onAddStudents,
        canAddStudents,
        onSendEmailOpen,
        onEditGradeOpen,
        canSendEmailToGradeStudents,
      } = this.props;
      const { openMenu } = this.state;

      const showMenuButton = canAddStudents;
      const showEmailButton = canSendEmailToGradeStudents;
      const showEditGrade = userRole === 'ADMIN';

      let image = null;
      if (grade.mimeType && grade.photo) {
        image = `${grade.mimeType},${grade.photo}`;
      }

      return (
        <Fragment>
          <GradeInfoMenu
            open={openMenu}
            id={this.menuId}
            anchorEl={this.menuAnchorEl}
            canEditGrade={showEditGrade}
            onAddStudents={onAddStudents}
            onClose={this.handleMenuClose}
            canAddStudents={canAddStudents}
            onEditGradeOpen={onEditGradeOpen}
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
            <div className={classes.imageContainer}>
              <Image
                rounded={false}
                alt={grade.name}
                editable={false}
                src={image || defaultImagesPaths.GRADE}
              />
            </div>
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
                Quantidade de professores: {grade.qntTeachers}
              </Typography>
              <Typography
                className={classes.infoText}
                component="h3"
                variant="subtitle1"
                gutterBottom
              >
                Quantidade de alunos: {grade.qntStudents}
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
    qntStudents: PropTypes.number,
    qntTeachers: PropTypes.number,
  }),
  onAddStudents: PropTypes.func.isRequired,
  onEditGradeOpen: PropTypes.func.isRequired,
  onSendEmailOpen: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default withStyles(styles)(GradeInfo);
