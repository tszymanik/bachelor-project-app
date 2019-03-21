import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { cloneDeep } from 'lodash';

import { updateObject, validate, capitalize } from '../../../../../../shared/utility';
import { formElements } from '../../../../../../shared/data';

import PageHeader from '../../../../../common/page/header/PageHeader';
import PageTitle from '../../../../../common/page/title/PageTitle';
import PageSubtitle from '../../../../../common/page/subtitle/PageSubtitle';
import Container from '../../../../../common/page/container/Container';
import Form from '../../../../../common/form/Form';
import Actions from '../../../../../common/form/actions/Actions';
import Input from '../../../../../common/form/input/Input';
import Submit from '../../../../../common/form/submit/Submit';
import ButtonSecondary from '../../../../../common/button/secondary/ButtonSecondary';

class EditGeneralPage extends Component {
  state = {
    formSubmitted: false,
    formIsValid: false,
    form: {
      email: cloneDeep(formElements.user.email),
      password: cloneDeep(formElements.user.password),
      firstName: cloneDeep(formElements.user.firstName),
      secondName: cloneDeep(formElements.user.secondName),
      lastName: cloneDeep(formElements.user.lastName),
      title: cloneDeep(formElements.user.title),
      pesel: cloneDeep(formElements.user.pesel),
      fatherName: cloneDeep(formElements.user.fatherName),
      motherName: cloneDeep(formElements.user.motherName),
      sex: cloneDeep(formElements.user.sex),
      maidenName: cloneDeep(formElements.user.maidenName),
      citizenship: cloneDeep(formElements.user.citizenship),
      nationality: cloneDeep(formElements.user.nationality),
      placeOfBirth: cloneDeep(formElements.user.placeOfBirth),
      voivodeshipOfBirth: cloneDeep(formElements.user.voivodeshipOfBirth),
      workEmail: cloneDeep(formElements.user.workEmail),
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

    const typesOfUserData = userData.typesOfUserId;
    if (typesOfUserData) {
      typesOfUserData.forEach((typeOfUserId) => {
        form[typeOfUserId].elementConfig.checked = true;
      });
    }

    form.email.value = userData.email;
    form.email.validation.valid = true;
    form.password.validation.valid = true;
    form.firstName.value = userData.firstName;
    form.firstName.validation.valid = true;
    form.secondName.value = userData.secondName;
    form.secondName.validation.valid = true;
    form.lastName.value = userData.lastName;
    form.lastName.validation.valid = true;
    form.title.value = userData.title;
    form.pesel.value = userData.pesel;
    form.fatherName.value = userData.fatherName;
    form.motherName.value = userData.motherName;
    form.sex.value = userData.sex;
    form.maidenName.value = userData.maidenName;
    form.citizenship.value = userData.citizenship;
    form.nationality.value = userData.nationality;
    form.placeOfBirth.value = userData.placeOfBirth;
    form.voivodeshipOfBirth.value = userData.voivodeshipOfBirth;
    form.workEmail.value = userData.workEmail;

    this.setState({
      form,
    });
  }

  handleChange = formElementId => (event) => {
    const updatedFormElement = updateObject(this.state.form[formElementId], {
      value: event.target.value,
      elementConfig: updateObject(this.state.form[formElementId].elementConfig, {
        checked: event.target.checked,
      }),
      validation: updateObject(this.state.form[formElementId].validation, {
        valid: validate(event.target.value, this.state.form[formElementId].validation.rules),
      }),
      touched: true,
    });

    const updatedForm = updateObject(this.state.form, {
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
      } else if (key === 'password') {
        if (form[key].value !== null) {
          formData[key] = form[key].value;
        }
      } else {
        formData[key] = form[key].value;
      }
    });

    formData.typesOfUserId = typesOfUser;

    axios.patch(
      `http://localhost:4000/users/${this.props.match.params.userId}`,
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
        <Redirect to={`/admin/users/${this.props.match.params.userId}/general`} />
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
          <PageTitle>Edytuj generalne informacje o użytkowniku</PageTitle>
          <PageSubtitle>Identyfikator {this.props.match.params.userId}</PageSubtitle>
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

export default connect(mapStateToProps)(EditGeneralPage);
