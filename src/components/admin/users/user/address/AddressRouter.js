import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ResidenceAddressRouter from './residence/ResidenceAddressRouter';
import MailingAdressRouter from './mailing/MailingAddressRouter';

const AdressRouter = () => (
  <Switch>
    <Route path="/admin/users/:id/address/residence" component={ResidenceAddressRouter} />
    <Route path="/admin/users/:id/address/mailing" component={MailingAdressRouter} />
  </Switch>
);

export default AdressRouter;
