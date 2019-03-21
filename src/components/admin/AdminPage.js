import React from 'react';
import { Redirect } from 'react-router-dom';

const AdminPage = () => (
  <Redirect to="/admin/users" />
);

export default AdminPage;
