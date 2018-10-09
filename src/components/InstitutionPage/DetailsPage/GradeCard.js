import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card, CardActionArea, CardContent,
  CardMedia, Typography, Fade,
} from '@material-ui/core';

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

class GradeCard extends Component {
  constructor(props) {
    super(props);

    this.handleSubjectSelectToggle = this.handleSubjectSelectToggle.bind(this);
  }

  handleSubjectSelectToggle() {
    const {
      history: { push },
      gradeId,
    } = this.props;
    push(`/institution/grade/${gradeId}`);
  }

  render() {
    const { classes, grade } = this.props;

    return (
      <Fade in>
        <StyledCard
          className={classes.gradeCardRoot}
          onClick={this.handleSubjectSelectToggle}
        >
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
                Disciplinas cadastradas: {grade.subjects.length}
              </UnderlinedTypo>
              <UnderlinedTypo component="p">
                Quantidade de alunos: 35
              </UnderlinedTypo>
            </CardContent>
          </CardActionArea>
        </StyledCard>
      </Fade>
    );
  }
}

GradeCard.propTypes = {
  classes: PropTypes.object.isRequired,
  grade: PropTypes.object.isRequired,
  gradeId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps({ grade }, { gradeId }) {
  return {
    grade: grade.byId[gradeId],
  };
}

export default withRouter(withStyles(styles)(
  connect(mapStateToProps)(GradeCard)));
