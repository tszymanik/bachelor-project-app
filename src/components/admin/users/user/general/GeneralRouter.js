import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GeneralPage from './GeneralPage';
import EditGeneralPage from './edit/EditGeneralPage';

const GeneralRouter = () => (
  <Switch>
    <Route exact path="/admin/users/:userId/general" component={GeneralPage} />
    <Route path="/admin/users/:userId/general/edit" component={EditGeneralPage} />
  </Switch>
);

export default GeneralRouter;
