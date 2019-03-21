import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MarksPage from './MarksPage';
import AddMarkPage from './add/AddMarkPage';
import MarksSemesterPage from './semester/MarksSemesterPage';

const MarksRouter = () => (
  <Switch>
    <Route exact path="/admin/users/:userId/education/:educationItemId/marks" component={MarksPage} />
    <Route path="/admin/users/:userId/education/:educationItemId/marks/add" component={AddMarkPage} />
    <Route path="/admin/users/:userId/education/:educationItemId/marks/semester/:semesterNumber" component={MarksSemesterPage} />
  </Switch>
);

export default MarksRouter;
