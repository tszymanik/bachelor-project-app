import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ResidenceAddressPage from './residence/ResidenceAddressPage';
import MailingAdressPage from './mailing/MailingAddressPage';

const AdressRouter = () => (
  <Switch>
    <Route path="/user/address/residence" component={ResidenceAddressPage} />
    <Route path="/user/address/mailing" component={MailingAdressPage} />
  </Switch>
);

export default AdressRouter;
