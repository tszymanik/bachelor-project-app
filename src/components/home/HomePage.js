import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const HomePage = (props) => {
  if (props.isAuth) {
    return <Redirect to="/user" />;
  }
  return <Redirect to="/login" />;
};

const mapStateToProps = state => (
  {
    isAuth: state.auth.token !== null,
    isAdmin: state.auth.isAdmin,
  }
);

export default connect(mapStateToProps)(HomePage);
