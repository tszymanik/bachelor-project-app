import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { cloneDeep } from 'lodash';

import { updateObject, validate } from '../../../../../../../../shared/utility';
import { formElements } from '../../../../../../../../shared/data';

import PageHeader from '../../../../../../../common/page/header/PageHeader';
import PageTitle from '../../../../../../../common/page/title/PageTitle';
import Container from '../../../../../../../common/page/container/Container';
import Form from '../../../../../../../common/form/Form';
import Actions from '../../../../../../../common/form/actions/Actions';
import Input from '../../../../../../../common/form/input/Input';
import Submit from '../../../../../../../common/form/submit/Submit';
import ButtonSecondary from '../../../../../../../common/button/secondary/ButtonSecondary';

class AddMarkPage extends Component {
  state = {
    formSubmitted: false,
    formIsValid: false,
    form: {
      semesterNumber: cloneDeep(formElements.mark.semesterNumber),
      subjectId: cloneDeep(formElements.mark.subjectId),
      typeOfSubject: cloneDeep(formElements.mark.typeOfSubject),
      typeOfTerm: cloneDeep(formElements.mark.typeOfTerm),
      teacherId: cloneDeep(formElements.mark.teacherId),
      termNumber: cloneDeep(formElements.mark.termNumber),
    },
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const form = { ...this.state.form };

    const allTeachersResponse = await axios.get('/users', {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
      params: {
        typesOfUserName: ['nauczyciel'],
      },
    });
    const allTeachersData = allTeachersResponse.data;

    const teachers = [];
    allTeachersData.forEach((teacherData) => {
      const teacher = {
        value: teacherData.id,
        label: `${teacherData.firstName} ${teacherData.lastName}`,
      };
      teachers.push(teacher);
    });
    form.teacherId.elementConfig.options = teachers;

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
        valid: validate(event.target.value, form[formElementId].validation.rules)
      }),
      touched: true,
    });

    const updatedForm = updateObject(form, {
      [formElementId]: updatedFormElement,
    });

    if (formElementId === 'semesterNumber') {
      if (event.target.value !== '') {
        const semesterNumber = event.target.value;

        const educationItemResponse = await axios.get(`/education/${this.props.match.params.educationItemId}`, {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
          },
        });
        const educationItemData = educationItemResponse.data;

        const subjectsResponse = await axios.get('/subjects', {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
          },
          params: {
            fieldOfStudyId: educationItemData.fieldOfStudyId,
            semesterNumber,
          },
        });
        const subjectsData = subjectsResponse.data;

        const subjects = [];
        subjectsData.forEach((subjectData) => {
          const subject = {
            value: subjectData.id,
            label: subjectData.name,
          };

          subjects.push(subject);
        });
        updatedForm.subjectId.elementConfig.options = subjects;
      } else {
        updatedForm.subjectId.elementConfig.options = [];
      }
    }

    if (formElementId === 'typeOfTerm') {
      switch (event.target.value) {
        case 'zaliczenie bez oceny':
          updatedForm.value = formElements.mark.valueTerm;
          break;
        default:
          updatedForm.value = formElements.mark.valueNumber;
          break;
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

    formData.studentId = this.props.match.params.userId;
    formData.educationItemId = this.props.match.params.educationItemId;

    axios.post(
      '/marks',
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
        <Redirect to={`/admin/users/${this.props.match.params.userId}/education/${this.props.match.params.educationItemId}/marks/semester/${this.state.form.semesterNumber.value}`} />
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
          <PageTitle>Dodaj ocenę</PageTitle>
        </PageHeader>
        <Container>
          <Form onSubmit={this.handleSubmit}>
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


export default connect(mapStateToProps)(AddMarkPage);
