import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { cloneDeep } from 'lodash';

import { updateObject, validate } from '../../../../../../shared/utility';
import { formElements } from '../../../../../../shared/data';

import PageHeader from '../../../../../common/page/header/PageHeader';
import PageTitle from '../../../../../common/page/title/PageTitle';
import Container from '../../../../../common/page/container/Container';
import Form from '../../../../../common/form/Form';
import Actions from '../../../../../common/form/actions/Actions';
import Input from '../../../../../common/form/input/Input';
import Submit from '../../../../../common/form/submit/Submit';
import ButtonSecondary from '../../../../../common/button/secondary/ButtonSecondary';

class AddEducationPage extends Component {
  state = {
    formSubmitted: false,
    formIsValid: false,
    form: {
      fieldOfStudyId: cloneDeep(formElements.user.education.fieldOfStudyId),
      specializationId: cloneDeep(formElements.user.education.specializationId),
      currentSemester: cloneDeep(formElements.user.education.currentSemester),
      currentAcademicYear: cloneDeep(formElements.user.education.currentAcademicYear),
    },
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const form = { ...this.state.form };

    const allFieldsOfStudyResponse = await axios.get('/fields-of-study', {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    });
    const allFieldsOfStudyData = allFieldsOfStudyResponse.data;
    const allFieldsOfStudy = [];

    allFieldsOfStudyData.forEach((fieldOfStudyData) => {
      const fieldOfStudy = {
        value: fieldOfStudyData.id,
        label: `${fieldOfStudyData.name} - ${fieldOfStudyData.academicYearName}`,
      };
      allFieldsOfStudy.push(fieldOfStudy);
    });

    form.fieldOfStudyId.elementConfig.options = allFieldsOfStudy;

    this.setState({
      form,
    });
  }

  handleChange = formElementId => async (event) => {
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

    if (formElementId === 'fieldOfStudyId') {
      if (event.target.value !== '') {
        const allSpecializationsResponse = await axios.get('/specializations', {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
          },
          params: {
            fieldOfStudyId: event.target.value,
          },
        });
        const allSpecializationsData = allSpecializationsResponse.data;
        const allSpecializations = [];
        allSpecializationsData.forEach((specializationData) => {
          const specialization = {
            value: specializationData.id,
            label: specializationData.name,
          };
          allSpecializations.push(specialization);
        });
        updatedForm.specializationId.elementConfig.options = allSpecializations;
      } else {
        updatedForm.specializationId.elementConfig.options = [];
      }
    }

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

    formData.userId = this.props.match.params.userId;

    axios.post(
      'http://localhost:4000/education',
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
        <Redirect to={`/admin/users/${this.props.match.params.userId}/education`} />
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
          <PageTitle>Dodaj ścieżkę edukacji</PageTitle>
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

export default connect(mapStateToProps)(AddEducationPage);
