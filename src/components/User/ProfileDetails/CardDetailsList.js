import React from 'react';
import PropTypes from 'prop-types';
import CardDetail from './CardDetail';
import { withRouter } from 'react-router-dom';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit * 2,
    color: 'gray',
    fontSize: '30px',
  },
  cardDetailsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    columnGap: theme.spacing.unit,
    gridAutoRows: '1fr',
  },
  cardDetail: {
    marginBottom: theme.spacing.unit,
  },
});

const getPath = (id, gradeId = null) => {
  if (gradeId) {
    return `/institution/grade/${gradeId}/subject/${id}`;
  }

  return `/institution/grade/${id}`;
};

const CardDetailsList = props => {
  const { classes, contentList, label, className } = props;

  return (
    <div className={className}>
      <Typography className={classes.title} component="h2" variant="h3" gutterBottom>
        {label}
      </Typography>
      <div className={classes.cardDetailsList}>
        {contentList.map(content => (
          <CardDetail
            className={classes.cardDetail}
            key={
              content.grade
                ? `grade-${content.grade}__subject-${content.id}`
                : `grade-${content.id}`
            }
            path={getPath(content.id, content.grade)}
            title={content.name}
            subTitle={content.gradeName}
          />
        ))}
      </div>
    </div>
  );
};

CardDetailsList.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  contentList: PropTypes.arrayOf(
    PropTypes.shape({
      grade: PropTypes.string,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  label: PropTypes.string.isRequired,
};

export default withStyles(styles)(withRouter(CardDetailsList));
