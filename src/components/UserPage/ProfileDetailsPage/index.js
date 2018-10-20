import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProfileDetailsPage extends Component {
  componentDidMount() {}

  render() {
    const { user } = this.props;
    return (
      <div>Details works { user.username }</div>
    );
  }
}

function mapToProps({ user }, { match }) {
  return {
    user: user.byId[match.params.userId || user.loggedUserId],
    loggedUserId: user.loggedUserId,
  };
}

ProfileDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapToProps)(ProfileDetailsPage);
