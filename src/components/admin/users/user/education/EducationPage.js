import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import PageHeader from '../../../../common/page/header/PageHeader';
import PageTitle from '../../../../common/page/title/PageTitle';
import PageSubtitle from '../../../../common/page/subtitle/PageSubtitle';
import Container from '../../../../common/page/container/Container';
import Row from '../../../../common/page/row/Row';
import Sidebar from '../../../../common/page/sidebar/Sidebar';
import AdminUserSidebarNav from '../../../../common/page/sidebar/nav/admin/user/AdminUserSidebarNav';
import Content from '../../../../common/page/content/Content';
import Actions from '../../../../common/page/actions/Actions';
import Table from '../../../../common/table/Table';
import TableHead from '../../../../common/table/head/TableHead';
import TableBody from '../../../../common/table/body/TableBody';
import TableRow from '../../../../common/table/row/TableRow';
import TableCell from '../../../../common/table/cell/TableCell';
import TableHeaderCell from '../../../../common/table/cell/header/TableHeaderCell';
import ButtonPrimary from '../../../../common/button/primary/ButtonPrimary';
import Modal from '../../../../common/modal/Modal';

class EducationPage extends Component {
  state = {
    education: [],
    modal: {
      show: false,
      params: {
        educationItemId: '',
      },
    },
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const education = [];

    const educationResponse = await axios.get('/education', {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
      params: {
        userId: this.props.match.params.userId,
      },
    });
    const educationData = educationResponse.data;

    await Promise.all(educationData.map(async (educationItemData) => {
      const { fieldOfStudyId } = educationItemData;
      const fieldOfStudyResponse = await axios.get(`/fields-of-study/${fieldOfStudyId}`, {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      });
      const fieldOfStudyData = fieldOfStudyResponse.data;

      const { specializationId } = educationItemData;
      const specializationResponse = await axios.get(`/specializations/${specializationId}`, {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      });
      const specializationData = specializationResponse.data;

      const educationItem = {
        id: educationItemData.id,
        fieldOfStudy: fieldOfStudyData,
        specialization: specializationData,
        currentSemester: educationItemData.currentSemester,
        currentAcademicYear: educationItemData.currentAcademicYear,
      };

      education.push(educationItem);
    }));

    this.setState({
      education,
    });
  }

  handleShowModal = educationItemId => () => {
    const modal = { ...this.state.modal };
    modal.show = true;
    modal.params.educationItemId = educationItemId;

    this.setState({
      modal,
    });
  }

  handleHideModal = () => {
    const modal = { ...this.state.modal };
    modal.show = false;
    modal.params.educationItemData = '';

    this.setState({
      modal,
    });
  }

  handleDeleteEducationItem = () => {
    axios.delete(
      `/education/${this.state.modal.params.educationItemId}`,
      {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      },
    )
      .then(() => {
        const modal = { ...this.state.modal };
        modal.show = false;

        let education = [...this.state.education];

        education = education.filter(educationItem => educationItem.id
          !== this.state.modal.params.educationItemId);

        this.setState({
          modal,
          education,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let modal = null;
    if (this.state.modal.show) {
      modal = <Modal title="Usuń ścieżkę edukacji" hide={this.handleHideModal} confirm={this.handleDeleteEducationItem}>Czy na pewno usunąć ścieżkę edukacji?</Modal>;
    }

    return (
      <Fragment>
        {modal}
        <PageHeader>
          <PageTitle>Użytkownik</PageTitle>
          <PageSubtitle>Identyfikator {this.props.match.params.userId}</PageSubtitle>
        </PageHeader>
        <Container>
          <Row>
            <Sidebar>
              <AdminUserSidebarNav userId={this.props.match.params.userId} />
            </Sidebar>
            <Content>
              <Actions>
                <Link to={`/admin/users/${this.props.match.params.userId}/education/add`} className="btn btn-primary">Dodaj</Link>
              </Actions>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Id</TableHeaderCell>
                    <TableHeaderCell>Kierunek studiów</TableHeaderCell>
                    <TableHeaderCell>Specjalizacja</TableHeaderCell>
                    <TableHeaderCell>Aktualny semestr</TableHeaderCell>
                    <TableHeaderCell>Aktualny rok akademicki</TableHeaderCell>
                    <TableHeaderCell />
                    <TableHeaderCell />
                    <TableHeaderCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.education.map(educationItem => (
                    <TableRow key={educationItem.id}>
                      <TableCell>{educationItem.id}</TableCell>
                      <TableCell>{educationItem.fieldOfStudy.name}</TableCell>
                      <TableCell>{educationItem.specialization.name}</TableCell>
                      <TableCell>{educationItem.currentSemester}</TableCell>
                      <TableCell>{educationItem.currentAcademicYear}</TableCell>
                      <TableCell>
                        <Link to={`/admin/users/${this.props.match.params.userId}/education/${educationItem.id}`} className="btn btn-primary">Pokaż</Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/admin/users/${this.props.match.params.userId}/education/${educationItem.id}/edit`} className="btn btn-primary">Edytuj</Link>
                      </TableCell>
                      <TableCell>
                        <ButtonPrimary
                          onClick={this.handleShowModal(educationItem.id)}
                        >
                          Usuń
                        </ButtonPrimary>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Content>
          </Row>
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

export default connect(mapStateToProps)(EducationPage);
