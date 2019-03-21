import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { cloneDeep } from 'lodash';

import { updateObject, validate } from '../../../../../../../shared/utility';
import { formElements } from '../../../../../../../shared/data';

import PageHeader from '../../../../../../common/page/header/PageHeader';
import PageTitle from '../../../../../../common/page/title/PageTitle';
import PageSubtitle from '../../../../../../common/page/subtitle/PageSubtitle';
import Container from '../../../../../../common/page/container/Container';
import Form from '../../../../../../common/form/Form';
import Actions from '../../../../../../common/form/actions/Actions';
import Input from '../../../../../../common/form/input/Input';
import Submit from '../../../../../../common/form/submit/Submit';
import ButtonSecondary from '../../../../../../common/button/secondary/ButtonSecondary';

class EditMailingAddressPage extends Component {
  state = {
    formSubmitted: false,
    formIsValid: false,
    form: {
      voivodeship: cloneDeep(formElements.user.address.voivodeship),
      city: cloneDeep(formElements.user.address.city),
      street: cloneDeep(formElements.user.address.street),
      zipCode: cloneDeep(formElements.user.address.zipCode),
      postOffice: cloneDeep(formElements.user.address.postOffice),
      phoneNumer: cloneDeep(formElements.user.address.phoneNumer),
    },
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const userResponse = await axios.get(`/users/${this.props.match.params.userId}`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    });
    const userData = userResponse.data;

    if (userData.mailingAddress) {
      const form = { ...this.state.form };
      form.voivodeship.value = userData.mailingAddress.voivodeship;
      form.city.value = userData.mailingAddress.city;
      form.street.value = userData.mailingAddress.street;
      form.zipCode.value = userData.mailingAddress.zipCode;
      form.postOffice.value = userData.mailingAddress.postOffice;
      form.phoneNumer.value = userData.mailingAddress.phoneNumer;

      this.setState({
        form,
      });
    }
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

    Object.keys(form).forEach((key) => {
      formData[key] = form[key].value;
    });

    axios.patch(
      `http://localhost:4000/users/${this.props.match.params.userId}/address/mailing`,
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
        <Redirect to={`/admin/users/${this.props.match.params.userId}/address/mailing`} />
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
          <PageTitle>Edytuj informacje o adresie korespondencji użytkownika</PageTitle>
          <PageSubtitle>{this.props.match.params.userId}</PageSubtitle>
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

export default connect(mapStateToProps)(EditMailingAddressPage);
