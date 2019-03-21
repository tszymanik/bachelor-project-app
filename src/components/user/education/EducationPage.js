import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Container from '../../common/page/container/Container';
import Row from '../../common/page/row/Row';
import Sidebar from '../../common/page/sidebar/Sidebar';
import UserSidebarNav from '../../common/page/sidebar/nav/user/UserSidebarNav';
import Content from '../../common/page/content/Content';
import Table from '../../common/table/Table';
import TableHead from '../../common/table/head/TableHead';
import TableBody from '../../common/table/body/TableBody';
import TableRow from '../../common/table/row/TableRow';
import TableCell from '../../common/table/cell/TableCell';
import TableHeaderCell from '../../common/table/cell/header/TableHeaderCell';

class EducationPage extends Component {
  state = {
    education: [],
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
        userId: this.props.userId,
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

  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <Sidebar>
              <UserSidebarNav />
            </Sidebar>
            <Content>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Id</TableHeaderCell>
                    <TableHeaderCell>Kierunek studiów</TableHeaderCell>
                    <TableHeaderCell>Specjalizacja</TableHeaderCell>
                    <TableHeaderCell>Aktualny semestr</TableHeaderCell>
                    <TableHeaderCell>Aktualny rok akademicki</TableHeaderCell>
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
                        <Link to={`/user/education/${educationItem.id}`} className="btn btn-primary">Pokaż</Link>
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
