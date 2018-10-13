import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SubjectInfo from './SubjectInfo';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: ${({ unit }) => unit || 8}px;
 
  @media screen and (min-width: 1920px) {
    width: calc(50% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (min-width: 1280px) and (max-width: 1919px) {
    width: calc(60% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (min-width: 960px) and (max-width: 1279px) {
    width: calc(70% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (min-width: 700px) and (max-width: 959px) {
    width: calc(80% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (min-width: 600px) and (max-width: 699px) {
    width: calc(85% - ${({ unit }) => (unit || 8) * 2}px);
  }

  @media screen and (max-width: 599px) {
    width: calc(95% - ${({ unit }) => (unit || 8) * 2}px);
  }
`;

/*
* This component needs data that is fetched by other
* component, it needs to change.
* TODO add apollo-graphql and me this component get its
* own data.
*/
class SubjectDetailsPage extends Component {
  handleAddTeacherClick = () => {
    // TODO
  }

  render() {
    const { subject } = this.props;
    return (
      <Container>
        {subject &&
        <SubjectInfo
          subject={subject}
          onAddTeacherClick={this.handleAddTeacherClick}
        />}
      </Container>
    );
  }
}

SubjectDetailsPage.propTypes = {
  subject: PropTypes.object,
};

function mapToProps({ subject }, { match: { params: { subjectId } } }) {
  const sub = subject.byId[subjectId];
  if (sub) {
    return {
      subject: sub,
    };
  }

  return {};
}

export default connect(mapToProps)(SubjectDetailsPage);
