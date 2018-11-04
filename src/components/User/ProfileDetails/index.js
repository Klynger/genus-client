import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import UserInfo from './UserInfo';

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

const ProfileDetails = ({ user }) => <Container>{user && <UserInfo user={user} />}</Container>;

function mapToProps({ user }, { match }) {
  return {
    user: user.byId[match.params.userId || user.loggedUserId],
    loggedUserId: user.loggedUserId,
  };
}

ProfileDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapToProps)(ProfileDetails);
