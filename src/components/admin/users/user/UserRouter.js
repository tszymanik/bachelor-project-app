import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserPage from './UserPage';
import GeneralRouter from './general/GeneralRouter';
import AddressRouter from './address/AddressRouter';
import HighSchoolRouter from './high-school/HighSchoolRouter';
import EducationRouter from './education/EducationRouter';

const UserRouter = () => (
  <Switch>
    <Route exact path="/admin/users/:id" component={UserPage} />
    <Route path="/admin/users/:id/general" component={GeneralRouter} />
    <Route path="/admin/users/:id/address" component={AddressRouter} />
    <Route path="/admin/users/:id/high-school" component={HighSchoolRouter} />
    <Route path="/admin/users/:id/education" component={EducationRouter} />
  </Switch>
);

export default UserRouter;
