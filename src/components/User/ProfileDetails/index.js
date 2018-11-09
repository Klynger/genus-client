import React from 'react';
import UserInfo from './UserInfo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DefaultContainerRoute from '../../utils/DefaultContainerRoute';

const ProfileDetails = ({ user }) => (
  <DefaultContainerRoute>{user && <UserInfo user={user} />}</DefaultContainerRoute>
);

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
  user: PropTypes.object,
};

export default connect(mapToProps)(ProfileDetails);
