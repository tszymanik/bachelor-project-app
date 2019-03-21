import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminPage from './AdminPage';
import UsersRouter from './users/UsersRouter';

const AdminRouter = () => (
  <Switch>
    <Route exact path="/admin" component={AdminPage} />
    <Route path="/admin/users" component={UsersRouter} />
  </Switch>
);

export default AdminRouter;
