import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserPage from './UserPage';
import GeneralPage from './general/GeneralPage';
import AddressRouter from './address/AddressRouter';
import HighSchoolPage from './high-school/HighSchoolPage';
import EducationRouter from './education/EducationRouter';

const UserRouter = () => (
  <Switch>
    <Route exact path="/user" component={UserPage} />
    <Route path="/user/general" component={GeneralPage} />
    <Route path="/user/address" component={AddressRouter} />
    <Route path="/user/high-school" component={HighSchoolPage} />
    <Route path="/user/education" component={EducationRouter} />
  </Switch>
);

export default UserRouter;
