import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UsersPage from './UsersPage';
import AddUserPage from './add/AddUserPage';
import UserRouter from './user/UserRouter';

const UsersRouter = () => (
  <Switch>
    <Route exact path="/admin/users" component={UsersPage} />
    <Route exact path="/admin/users/add" component={AddUserPage} />
    <Route path="/admin/users/:id" component={UserRouter} />
  </Switch>
);

export default UsersRouter;
