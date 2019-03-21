import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ResidenceAddressPage from './ResidenceAddressPage';
import EditResidenceAddressPage from './edit/EditResidenceAdressPage';

const ResidenceAddressRouter = () => (
  <Switch>
    <Route exact path="/admin/users/:userId/address/residence" component={ResidenceAddressPage} />
    <Route path="/admin/users/:userId/address/residence/edit" component={EditResidenceAddressPage} />
  </Switch>
);

export default ResidenceAddressRouter;
