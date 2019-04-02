// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import React, { Component } from 'react';
import SubjectRoutes from './SubjectRoutes';
// import { findSubjectById } from '../../actions/subject';
export default SubjectRoutes;
// class SubjectPage extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       subjectReady: false,
//     };
//   }

//   componentDidMount() {
//     const {
//       findCurrentSubjectById,
//       match: {
//         params: { subjectId },
//       },
//     } = this.props;
//     findCurrentSubjectById(subjectId).then(() => {
//       this.setState({ subjectReady: true });
//     });
//   }

//   render() {
//     if (this.state.subjectReady) {
//       return <SubjectRoutes match={this.props.match} />;
//     }

//     return null;
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     findCurrentSubjectById: subjectId => dispatch(findSubjectById(subjectId)),
//   };
// }

// SubjectPage.propTypes = {
//   findCurrentSubjectById: PropTypes.func.isRequired,
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       subjectId: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
// };

// export default connect(
//   null,
//   mapDispatchToProps,
// )(SubjectPage);
