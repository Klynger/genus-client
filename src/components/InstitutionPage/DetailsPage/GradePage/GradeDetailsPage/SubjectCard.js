import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card, CardActionArea, CardContent,
  CardMedia, Typography, Fade,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const StyledCard = styled(Card)``;

const StyledCardMedia = styled(CardMedia)`
  height: 140px;
  opacity: 0.5;
  transition: opacity ${props =>
    props.transitionHoverDuration || 250}ms ${props =>
      props.transitionHoverFunction || 'cubic-bezier(0.4, 0, 0.2, 1)'};

  ${StyledCard}:hover & {
    opacity: 1;
  }
`;

const UnderlinedTypo = styled(Typography)`
  ${StyledCard}:hover & {
    text-decoration: underline;
  }
`;

const styles = () => ({
  subjectCardRoot: {
    borderRadius: 0,
    height: '100%',
    width: '100%',
  },
  subjectCardActionArea: {
    height: '100%',
    width: '100%',
  },
});

const SubjectCard = ({ classes, subject }) => (
  <div>
    <Fade in>
      <StyledCard
        className={classes.subjectCardRoot}
      >
        <CardActionArea className={classes.subjectCardActionArea}>
          <StyledCardMedia
            title={subject.name}
            image="/static/images/grade-default-img.jpg"
          />
          <CardContent>
            <UnderlinedTypo variant="headline" component="h2">
              {subject.name}
            </UnderlinedTypo>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    </Fade>
  </div>
);

SubjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
  subjectId: PropTypes.string.isRequired, // eslint-disable-line
};

function mapToProps({ subject: { byId } }, { subjectId }) {
  return {
    subject: byId[subjectId],
  };
}

export default withStyles(styles)(connect(mapToProps)(SubjectCard));
