import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MarksPage from './MarksPage';
import MarksSemesterPage from './semester/MarksSemesterPage';

const MarksRouter = () => (
  <Switch>
    <Route exact path="/user/education/:educationItemId/marks" component={MarksPage} />
    <Route path="/user/education/:educationItemId/marks/semester/:semesterNumber" component={MarksSemesterPage} />
  </Switch>
);

export default MarksRouter;
