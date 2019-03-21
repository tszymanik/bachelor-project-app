import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EducationItemPage from './EducationItemPage';
import EditEducationItemPage from './edit/EditEducationItemPage';
import MarksRouter from './marks/MarksRouter';

const EducationItemRouter = () => (
  <Switch>
    <Route exact path="/admin/users/:userId/education/:educationItemId" component={EducationItemPage} />
    <Route path="/admin/users/:userId/education/:educationItemId/edit" component={EditEducationItemPage} />
    <Route path="/admin/users/:userId/education/:educationItemId/marks" component={MarksRouter} />
  </Switch>
);

export default EducationItemRouter;
