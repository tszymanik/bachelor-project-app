import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EducationItemPage from './EducationItemPage';
import MarksRouter from './marks/MarksRouter';

const EducationItemRouter = () => (
  <Switch>
    <Route exact path="/user/education/:educationItemId" component={EducationItemPage} />
    <Route path="/user/education/:educationItemId/marks" component={MarksRouter} />
  </Switch>
);

export default EducationItemRouter;
