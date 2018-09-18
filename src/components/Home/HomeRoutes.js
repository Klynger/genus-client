import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
// import Loadable from 'react-loadable';
import NotFoundPage from '../NotFoundPage';
import CreateInstitutionPage from '../CreateInstitutionPage';

// const AsyncCreateInstitutionPage = Loadable({
//   loader: () => import('../CreateInstitutionPage'),
// });

export default () => (
  <Fragment>
    <Route path="/institution/create" exact component={CreateInstitutionPage} />
    <Route component={NotFoundPage} />
  </Fragment>
);
