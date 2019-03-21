import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { cloneDeep } from 'lodash';

import PageHeader from '../common/page/header/PageHeader';
import PageTitle from '../common/page/title/PageTitle';
import Container from '../common/page/container/Container';
import Form from '../common/form/Form';
import Actions from '../common/form/actions/Actions';
import Input from '../common/form/input/Input';
import Submit from '../common/form/submit/Submit';

import * as actions from '../../store/actions/index';

import { updateObject, validate } from '../../shared/utility';
import { formElements } from '../../shared/data';

class LoginPage extends Component {
  state = {
    formIsValid: false,
    form: {
      email: cloneDeep(formElements.user.email),
      password: cloneDeep(formElements.user.password),
    },
  }

  handleChange = formElementId => (event) => {
    const { form } = this.state;

    const updatedFormElement = updateObject(form[formElementId], {
      value: event.target.value,
      elementConfig: updateObject(form[formElementId].elementConfig, {
        checked: event.target.checked,
      }),
      validation: updateObject(form[formElementId].validation, {
        valid: validate(event.target.value, form[formElementId].validation.rules),
      }),
      touched: true,
    });

    const updatedForm = updateObject(form, {
      [formElementId]: updatedFormElement,
    });

    let formIsValid = true;

    Object.keys(updatedForm).forEach((key) => {
      formIsValid = updatedForm[key].validation.valid && formIsValid;
    });

    this.setState({
      form: updatedForm,
      formIsValid,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onAuth(
      this.state.form.email.value,
      this.state.form.password.value,
    );
  }

  render() {
    if (this.props.isAuth) {
      return (
        <Redirect to="/user" />
      );
    }

    const form = [];

    Object.keys(this.state.form).forEach((key) => {
      form.push({
        id: key,
        config: this.state.form[key],
      });
    });

    if (this.props.error) {
      console.log(this.props.error.message);
    }

    return (
      <Fragment>
        <PageHeader>
          <PageTitle>Panel logowania</PageTitle>
        </PageHeader>
        <Container>
          <Form onSubmit={this.handleSubmit} noValidate>
            {form.map(formElement => (
              <Input
                key={formElement.id}
                label={formElement.config.label}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                touched={formElement.config.touched}
                change={this.handleChange(formElement.id)}
                valid={formElement.config.validation.valid}
              />
            ))}
            <Actions>
              <Submit disabled={!this.state.formIsValid}>Zaloguj się</Submit>
            </Actions>
          </Form>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => (
  {
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
