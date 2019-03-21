import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EducationPage from './EducationPage';
import EducationItemRouter from './item/EducationItemRouter';

const EducationRouter = () => (
  <Switch>
    <Route exact path="/user/education" component={EducationPage} />
    <Route path="/user/education/:educationItemId" component={EducationItemRouter} />
  </Switch>
);

export default EducationRouter;
