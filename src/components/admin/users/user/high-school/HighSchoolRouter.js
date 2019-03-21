import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HighSchoolPage from './HighSchoolPage';
import EditHighSchoolPage from './edit/EditHighSchoolPage';

const HighSchoolRouter = () => (
  <Switch>
    <Route exact path="/admin/users/:userId/high-school" component={HighSchoolPage} />
    <Route path="/admin/users/:userId/high-school/edit" component={EditHighSchoolPage} />
  </Switch>
);

export default HighSchoolRouter;
