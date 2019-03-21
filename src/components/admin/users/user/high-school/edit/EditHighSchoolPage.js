import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { cloneDeep } from 'lodash';

import { updateObject, validate } from '../../../../../../shared/utility';
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

class EditHighSchoolPage extends Component {
  state = {
    formSubmitted: false,
    formIsValid: false,
    form: {
      completedHighSchool: cloneDeep(formElements.user.highSchool.completedHighSchool),
      highSchoolCompletionYear: cloneDeep(formElements.user.highSchool.highSchoolCompletionYear),
      highSchoolCompletionCity: cloneDeep(formElements.user.highSchool.highSchoolCompletionCity),
      highSchoolLaureate: cloneDeep(formElements.user.highSchool.highSchoolLaureate),
      contestLaureate: cloneDeep(formElements.user.highSchool.contestLaureate),
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

    if (userData.highSchool) {
      const form = { ...this.state.form };
      form.completedHighSchool.value = userData.highSchool.completedHighSchool;
      form.highSchoolCompletionYear.value = userData.highSchool.highSchoolCompletionYear;
      form.highSchoolCompletionCity.value = userData.highSchool.highSchoolCompletionCity;
      form.highSchoolLaureate.value = userData.highSchool.highSchoolLaureate;
      form.contestLaureate.value = userData.highSchool.contestLaureate;

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
      `http://localhost:4000/users/${this.props.match.params.id}/high-school`,
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
        <Redirect to={`/admin/users/${this.props.match.params.userId}/high-school`} />
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
          <PageTitle>Edytuj informacje o szkole średniej użytkownika</PageTitle>
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

export default connect(mapStateToProps)(EditHighSchoolPage);
