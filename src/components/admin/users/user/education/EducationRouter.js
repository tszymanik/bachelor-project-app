import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EducationPage from './EducationPage';
import AddEducationPage from './add/AddEducationPage';
import EducationItemRouter from './item/EducationItemRouter';

const EducationRouter = () => (
  <Switch>
    <Route exact path="/admin/users/:userId/education" component={EducationPage} />
    <Route path="/admin/users/:userId/education/add" component={AddEducationPage} />
    <Route path="/admin/users/:userId/education/:educationItemId" component={EducationItemRouter} />
  </Switch>
);

export default EducationRouter;
