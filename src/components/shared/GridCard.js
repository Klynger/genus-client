import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Fade } from '@material-ui/core';

const StyledCard = styled(Card)``;

const StyledCardMedia = styled(CardMedia)`
  height: 140px;
  opacity: 0.5;
  transition: opacity ${props => props.transitionHoverDuration || 250}ms
    ${props => props.transitionHoverFunction || 'cubic-bezier(0.4, 0, 0.2, 1)'};

  ${StyledCard}:hover & {
    opacity: 1;
  }
`;

const UnderlinedTypo = styled(Typography)`
  ${StyledCard}:hover & {
    text-decoration: underline;
  }
`;

export const CardLine = ({ children, ...rest }) => (
  <UnderlinedTypo {...rest} component="span">
    {children}
  </UnderlinedTypo>
);

CardLine.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = () => ({
  subjectCardRoot: {
    height: '100%',
    width: '100%',
  },
  subjectCardActionArea: {
    height: '100%',
    width: '100%',
  },
});

const GridCard = ({ classes, children, imgAlt, imgSrc, onClick, title }) => {
  return (
    <div>
      <Fade in>
        <StyledCard className={classes.subjectCardRoot}>
          <CardActionArea className={classes.subjectCardActionArea} onClick={onClick}>
            <StyledCardMedia title={imgAlt} image={imgSrc} />
            <CardContent>
              <UnderlinedTypo variant="h5" component="h3">
                {title}
              </UnderlinedTypo>
              {children}
            </CardContent>
          </CardActionArea>
        </StyledCard>
      </Fade>
    </div>
  );
};

GridCard.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  classes: PropTypes.object.isRequired,
  imgAlt: PropTypes.string,
  imgSrc: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

GridCard.defaultProps = {
  imgSrc: '/static/images/grade-default-img.jpg',
  onClick: () => undefined,
};

export default withStyles(styles)(GridCard);
