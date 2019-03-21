import React from 'react';
import { Redirect } from 'react-router-dom';

const UserPage = props => (
  <Redirect to={`/admin/users/${props.match.params.id}/general`} />
);

export default UserPage;
