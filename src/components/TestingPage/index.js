import React from 'react';
// import styled from 'styled-components';
// import { Button } from '@material-ui/core';
// import CreateEntryCodeDialog from '../InstitutionPage/EntryCode/CreateEntryCodeDialog';
// import UserList from '../InstitutionPage/DetailsPage/UserList';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import TestingRoutes from './TestingRoutes';

// const TestingPage = () => {
//   return (
//     <LandingContainer>
//       <Button variant="extendedFab" color="primary">
//         Criar Código
//       </Button>
//     </LandingContainer>
//   );
// };

// discussion: PropTypes.shape({
//   creationDate: PropTypes.string.isRequired,
//   creator: PropTypes.shape({
//     email: PropTypes.string.isRequired,
//     username: PropTypes.string.isRequired,
//   }).isRequired,
//   replies: PropTypes.arrayOf({
//     content: PropTypes.string,
//     date: PropTypes.string,
//     user: PropTypes.shape({
//       username: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
//   title: PropTypes.string,
// }).isRequired,

// const TEXT_MARKDOWN = `
// # Installation

// ## Download tarball

// You can download the latest release tarball directly from [releases][releases]

// ## Bower

//     bower install showdown

// ## npm (server-side)

//     npm install showdown

// ## CDN

// <blockquote>
//   This blockquote will change based on the HTML settings above.
// </blockquote>
// `;

// const DISCUSSION = {
//   creationDate: '10 - JAN - 2018',
//   creator: {
//     email: 't@t.com',
//     username: 'Ígor Brasileiro Duarte',
//   },
//   title: 'Primeira Publicação',
//   content: TEXT_MARKDOWN,
//   replies: [
//     {
//       id: 0,
//       content: 'asdada',
//       user: {
//         username: 'User 01',
//       },
//     },
//     {
//       id: 1,
//       content: '2222222',
//       user: {
//         username: 'User 02',
//       },
//     },
//     {
//       id: 2,
//       content: 'aaaaaaaa',
//       user: {
//         username: 'User 03',
//       },
//     },
//     {
//       id: 3,
//       content: 'test',
//       user: {
//         username: 'User 04',
//       },
//     },
//   ],
// };

const TestingPage = ({ match }) => <TestingRoutes match={match} />;

TestingPage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default TestingPage;
