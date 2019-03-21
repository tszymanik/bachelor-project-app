import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { cloneDeep } from 'lodash';

import { updateObject, validate, capitalize } from '../../../../shared/utility';
import { formElements } from '../../../../shared/data';

import PageHeader from '../../../common/page/header/PageHeader';
import PageTitle from '../../../common/page/title/PageTitle';
import Container from '../../../common/page/container/Container';
import Form from '../../../common/form/Form';
import Actions from '../../../common/form/actions/Actions';
import Input from '../../../common/form/input/Input';
import Submit from '../../../common/form/submit/Submit';
import ButtonSecondary from '../../../common/button/secondary/ButtonSecondary';

class AddUserPage extends Component {
  state = {
    formSubmitted: false,
    formIsValid: false,
    form: {
      email: cloneDeep(formElements.user.email),
      password: cloneDeep(formElements.user.password),
      firstName: cloneDeep(formElements.user.firstName),
      lastName: cloneDeep(formElements.user.lastName),
    },
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const allTypesOfUserResponse = await axios.get('/types-of-user', {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    });
    const allTypesOfUserData = allTypesOfUserResponse.data;

    const loadedFormElements = {};
    allTypesOfUserData.forEach((typeOfUserData) => {
      const formElement = cloneDeep(formElements.user.typeOfUserId);
      formElement.label = capitalize(typeOfUserData.name);
      formElement.value = typeOfUserData.id;
      loadedFormElements[typeOfUserData.id] = formElement;
    });

    const form = { ...loadedFormElements, ...this.state.form };

    this.setState({
      form,
    });
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

    const { form } = this.state;

    const formData = {};
    const typesOfUser = [];

    Object.keys(form).forEach((key) => {
      if (form[key].elementGroup) {
        if (form[key].elementGroup === 'typesOfUser') {
          if (form[key].elementConfig.checked) {
            typesOfUser.push(form[key].value);
          }
        }
      } else {
        formData[key] = form[key].value;
      }
    });

    formData.typesOfUserId = typesOfUser;

    axios.post(
      '/users',
      formData,
      {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      },
    )
      .then(() => {
        this.setState({
          formSubmitted: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.formSubmitted) {
      return (
        <Redirect to="/admin/users" />
      );
    }

    const form = [];

    Object.keys(this.state.form).forEach((key) => {
      form.push({
        id: key,
        config: this.state.form[key],
      });
    });

    return (
      <Fragment>
        <PageHeader>
          <PageTitle>Dodaj użytkownika</PageTitle>
        </PageHeader>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            {form.map(formElement => (
              <Input
                key={formElement.id}
                id={formElement.id}
                label={formElement.config.label}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                checked={formElement.checked}
                touched={formElement.config.touched}
                change={this.handleChange(formElement.id)}
                valid={formElement.config.validation.valid}
              />
            ))}
            <Actions>
              <Submit disabled={!this.state.formIsValid}>Wyślij</Submit>
              <ButtonSecondary onClick={this.props.history.goBack}>Anuluj</ButtonSecondary>
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
    userId: state.auth.userId,
  }
);

export default connect(mapStateToProps)(AddUserPage);
