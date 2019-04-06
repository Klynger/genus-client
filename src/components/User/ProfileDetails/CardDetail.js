import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getFirstInitialsCapitalized, stringToColor } from '../../../utils/helpers';
import { Avatar, Card, CardActionArea, CardHeader, withStyles } from '@material-ui/core';

const styles = () => ({
  noTextDecoration: {
    textDecoration: 'none', // to remove Link component text decoration
  },
});

const CardDetail = props => {
  const { classes, subTitle, title, path, ...anotherProps } = props;
  const bgColor = stringToColor(title);
  return (
    <Card {...anotherProps}>
      <CardActionArea>
        <CardHeader
          className={classes.noTextDecoration}
          component={Link}
          to={path}
          avatar={
            <Avatar style={{ backgroundColor: bgColor }} aria-label={'card-icon'}>
              {getFirstInitialsCapitalized(title, 1)}
            </Avatar>
          }
          title={title}
          subheader={subTitle}
          // subheader do here for Subject;
        />
      </CardActionArea>
    </Card>
  );
};

CardDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardDetail);
