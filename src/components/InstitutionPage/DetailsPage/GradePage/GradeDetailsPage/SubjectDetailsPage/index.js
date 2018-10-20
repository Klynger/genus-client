import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SubjectInfo from './SubjectInfo';
import AddteacherDialog from './AddTeacherDialog';
import React, { Component, Fragment } from 'react';
import { Fade } from '@material-ui/core';

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
  constructor(props) {
    super(props);

    this.state = {
      openAddTeacher: false,
    };
  }

  handleAddTeacherClick = () => {
    this.setState(({ openAddTeacher }) => ({
      openAddTeacher: !openAddTeacher,
    }));
  }

  render() {
    const { subject } = this.props;
    const { openAddTeacher } = this.state;

    let toRender;

    if (subject) {
      toRender = (
        <Fragment>
          <AddteacherDialog
            subject={subject}
            open={openAddTeacher}
            onClose={this.handleAddTeacherClick}
          />
          <SubjectInfo
            subject={subject}
            onAddTeacherClick={this.handleAddTeacherClick}
          />
        </Fragment>
      );
    } else {
      toRender = null;
    }

    return (
      <Fade in>
      <Container>
        {toRender}
      </Container>
      </Fade>
    );
  }
}

SubjectDetailsPage.propTypes = {
  subject: PropTypes.object,
};

function mapToProps(
  { subject, user },
  { match: { params: { subjectId } } }) {
  const sub = subject.byId[subjectId];
  if (sub) {
    return {
      subject: {
        ...sub,
        teachers: sub.teachers.map(id => user.byId[id]),
      },
    };
  }

  return {};
}

export default connect(mapToProps)(SubjectDetailsPage);
