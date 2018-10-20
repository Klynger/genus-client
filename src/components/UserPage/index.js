import PropTypes from 'prop-types';
import UserRoutes from './UserRoutes';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchUserById } from '../../actions/user';

class UserPage extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId
      && prevProps.match.params.userId !== this.props.loggedUserId
      && prevProps.match.params.userId !== this.props.match.params.userId) {
      this.props.fetchUser(this.props.match.params.userId)
        .then(() => {
          // TODO
        })
        .catch(() => {
          // TODO
        });
    }
  }

  render() {
    const { match } = this.props;
    return <UserRoutes match={match} />;
  }
}

UserPage.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  loggedUserId: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

function mapToProps({ user: { loggedUserId } }) {
  return {
    loggedUserId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (id) => dispatch(fetchUserById(id)),
  };
}

export default withRouter(connect(mapToProps, mapDispatchToProps)(UserPage));
