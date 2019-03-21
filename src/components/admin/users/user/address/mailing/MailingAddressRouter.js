import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MailingAddressPage from './MailingAddressPage';
import EditMailingAddressPage from './edit/EditMailingAddressPage';

const MailingAddressRouter = () => (
  <Switch>
    <Route exact path="/admin/users/:userId/address/mailing" component={MailingAddressPage} />
    <Route path="/admin/users/:userId/address/mailing/edit" component={EditMailingAddressPage} />
  </Switch>
);

export default MailingAddressRouter;
