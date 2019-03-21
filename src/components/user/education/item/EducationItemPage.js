import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import PageHeader from '../../../common/page/header/PageHeader';
import PageTitle from '../../../common/page/title/PageTitle';
import PageSubtitle from '../../../common/page/subtitle/PageSubtitle';
import Container from '../../../common/page/container/Container';
import Row from '../../../common/page/row/Row';
import Sidebar from '../../../common/page/sidebar/Sidebar';
import UserSidebarNav from '../../../common/page/sidebar/nav/user/UserSidebarNav';
import Content from '../../../common/page/content/Content';
import Heading from '../../../common/page/heading/Heading';
import Table from '../../../common/table/Table';
import TableBody from '../../../common/table/body/TableBody';
import TableRow from '../../../common/table/row/TableRow';
import TableCell from '../../../common/table/cell/TableCell';
import TableHeaderCell from '../../../common/table/cell/header/TableHeaderCell';

class EducationItemPage extends Component {
  state = {
    educationItem: {
      id: '',
      fieldOfStudy: {},
      specialization: {},
      currentSemester: 0,
      currentAcademicYear: '',
    },
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { educationItemId } = this.props.match.params;
    const educationItemResponse = await axios.get(`/education/${educationItemId}`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    });
    const educationItemData = educationItemResponse.data;

    const { fieldOfStudyId } = educationItemData;
    const fieldOfStudyResponse = await axios.get(`/fields-of-study/${fieldOfStudyId}`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    });
    const fieldOfStudyData = fieldOfStudyResponse.data;
    const fieldOfStudy = {
      id: fieldOfStudyData.id,
      name: fieldOfStudyData.name,
      shortName: fieldOfStudyData.shortName,
      facultyName: fieldOfStudyData.faculty.name,
      typeOfStudiesName: fieldOfStudyData.typeOfStudies.name,
      academicYearName: fieldOfStudyData.academicYearName,
      typeOfRecruitmentName: fieldOfStudyData.typeOfRecruitment.name,
      educationProfileName: fieldOfStudyData.educationProfile.name,
      levelOfEducationName: fieldOfStudyData.levelOfEducation.name,
      formOfStudiesName: fieldOfStudyData.formOfStudies.name,
    };

    const { specializationId } = educationItemData;
    const specializationResponse = await axios.get(`/specializations/${specializationId}`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    });
    const specializationData = specializationResponse.data;

    const educationItem = { ...this.state.educationItem };
    educationItem.id = educationItemData.id;
    educationItem.fieldOfStudy = fieldOfStudy;
    educationItem.specialization = specializationData;
    educationItem.currentSemester = educationItemData.currentSemester;
    educationItem.currentAcademicYear = educationItemData.currentAcademicYear;

    this.setState({
      educationItem,
    });
  }

  render() {
    return (
      <Fragment>
        <PageHeader>
          <PageTitle>
            Ścieżka edukacji
          </PageTitle>
          <PageSubtitle>
            Identyfikator {this.props.match.params.educationItemId}
          </PageSubtitle>
        </PageHeader>
        <Container>
          <Row>
            <Sidebar>
              <UserSidebarNav
                educationItemId={this.props.match.params.educationItemId}
              />
            </Sidebar>
            <Content>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHeaderCell>Id</TableHeaderCell>
                    <TableCell>{this.state.educationItem.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Aktualny semestr</TableHeaderCell>
                    <TableCell>{this.state.educationItem.currentSemester}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Aktualny rok akademicki</TableHeaderCell>
                    <TableCell>{this.state.educationItem.currentAcademicYear}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Heading>
                Kierunek studiów
              </Heading>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHeaderCell>
                      Id
                    </TableHeaderCell>
                    <TableCell>{this.state.educationItem.fieldOfStudy.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>
                      Nazwa
                    </TableHeaderCell>
                    <TableCell>{this.state.educationItem.fieldOfStudy.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>
                      Wydział
                    </TableHeaderCell>
                    <TableCell>{this.state.educationItem.fieldOfStudy.facultyName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>
                      Rodzaj studiów
                    </TableHeaderCell>
                    <TableCell>{this.state.educationItem.fieldOfStudy.typeOfStudiesName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>
                      Rok akademicki
                    </TableHeaderCell>
                    <TableCell>{this.state.educationItem.fieldOfStudy.academicYearName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>
                      Profil kształcenia
                    </TableHeaderCell>
                    <TableCell>
                      {this.state.educationItem.fieldOfStudy.educationProfileName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>
                      Poziom kształcenia
                    </TableHeaderCell>
                    <TableCell>
                      {this.state.educationItem.fieldOfStudy.levelOfEducationName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Forma studiów</TableHeaderCell>
                    <TableCell>{this.state.educationItem.fieldOfStudy.formOfStudiesName}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {this.state.educationItem.specialization ?
                <Fragment>
                  <Heading>Specjalizacja</Heading>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableHeaderCell>Id</TableHeaderCell>
                        <TableCell>{this.state.educationItem.specialization.id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHeaderCell>Nazwa</TableHeaderCell>
                        <TableCell>{this.state.educationItem.specialization.name}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Fragment>
                : null}
            </Content>
          </Row>
        </Container>
      </Fragment >
    );
  }
}

const mapStateToProps = state => (
  {
    token: state.auth.token,
    userId: state.auth.userId,
  }
);

export default connect(mapStateToProps)(EducationItemPage);
