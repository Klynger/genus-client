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
  gradeCardRoot: {
    borderRadius: 0,
    height: '100%',
    width: '100%',
  },
  gradeCardActionArea: {
    height: '100%',
    width: '100%',
  },
});

const GradeCard = ({ classes, grade }) => {
  return (
    <Fade in>
      <StyledCard className={classes.gradeCardRoot}>
        <CardActionArea className={classes.gradeCardActionArea}>
          <StyledCardMedia
            title={grade.name}
            image="/static/images/grade-default-img.jpg"
          />
          <CardContent>
            <UnderlinedTypo variant="headline" component="h2">
              {grade.name}
            </UnderlinedTypo>
            <UnderlinedTypo component="p">
              Disciplinas cadastradas: 7
            </UnderlinedTypo>
            <UnderlinedTypo component="p">
              Quantidade de alunos: 35
            </UnderlinedTypo>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    </Fade>
  );
};

GradeCard.propTypes = {
  classes: PropTypes.object.isRequired,
  grade: PropTypes.object.isRequired,
  gradeId: PropTypes.string.isRequired, // eslint-disable-line
};

function mapStateToProps({ grade }, { gradeId }) {
  return {
    grade: grade.byId[gradeId],
  };
}

export default withStyles(styles)(connect(mapStateToProps)(GradeCard));
