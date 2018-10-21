import React from 'react';
import PropTypes from 'prop-types';
import ImageUploader from '../../utils/ImageUploader';
import deepOrange from '@material-ui/core/colors/deepOrange';
import {
  Card,
  Button,
  withStyles,
  Typography,
  CardContent,
  CardActions,
} from '@material-ui/core';

const styles = theme => ({
  card: {
    borderRadius: 0,
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  imageContainer: {
    padding: theme.spacing.unit * 2,
    paddingTop: 0,
  },
  imageUploader: {
    backgroundColor: deepOrange.A400,
    fontSize: '4.25rem',
    minHeight: 140,
    minWidth: 140,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const UserInfo = ({ classes, user }) => (
  <Card className={classes.card}>
    <CardContent className={classes.content}>
      <div className={classes.imageContainer}>
        <ImageUploader
          alt="RK"
          initials="RK"
          className={classes.imageUploader}
        />
      </div>
      <Typography
        variant="h5"
        component="h2"
      >
        {user.username}
      </Typography>
      <Typography
        variant="subtitle1"
        component="span"
      >
        {user.email}
      </Typography>
    </CardContent>
    <CardActions className={classes.actions}>
      <Button color="primary">Editar</Button>
    </CardActions>
  </Card>
);

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);
