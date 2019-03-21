import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
// import axios from 'axios';

import * as actions from './store/actions/index';

import LoginPage from './components/login/LoginPage';
import LogoutPage from './components/logout/LogoutPage';
import UserRouter from './components/user/UserRouter';
import AdminRouter from './components/admin/AdminRouter';
import HomePage from './components/home/HomePage';

import Header from './components/common/header/Header';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoAuth();
  }

  render() {
    let routes = (
      <Fragment>
        <Header isAuth={this.props.isAuth} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </Fragment>
    );

    if (this.props.isAuth) {
      if (this.props.isAdmin) {
        routes = (
          <Fragment>
            <Header isAuth={this.props.isAuth} isAdmin={this.props.isAdmin} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/logout" component={LogoutPage} />
              <Route path="/user" component={UserRouter} />
              <Route path="/admin" component={AdminRouter} />
            </Switch>
          </Fragment>
        );
      } else {
        routes = (
          <Fragment>
            <Header isAuth={this.props.isAuth} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/logout" component={LogoutPage} />
              <Route path="/user" component={UserRouter} />
            </Switch>
          </Fragment>
        );
      }
    }

    return routes;
  }
}

const mapStateToProps = state => (
  {
    token: state.auth.token,
    userId: state.auth.userId,
    isAuth: state.auth.token !== null,
    isAdmin: state.auth.isAdmin,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onTryAutoAuth: () => dispatch(actions.checkAuthState()),
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
