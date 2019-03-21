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
import TableBody from '../../../../common/table/body/TableBody';
import TableRow from '../../../../common/table/row/TableRow';
import TableCell from '../../../../common/table/cell/TableCell';
import TableHeaderCell from '../../../../common/table/cell/header/TableHeaderCell';

class HighSchoolPage extends Component {
  state = {
    user: {
      highSchool: {
        completedHighSchool: '',
        highSchoolCompletionYear: '',
        highSchoolCompletionCity: '',
        highSchoolLaureate: '',
        contestLaureate: '',
      },
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
      const user = { ...this.state.user };
      user.highSchool.completedHighSchool = userData.highSchool.completedHighSchool;
      user.highSchool.highSchoolCompletionYear = userData.highSchool.highSchoolCompletionYear;
      user.highSchool.highSchoolCompletionCity = userData.highSchool.highSchoolCompletionCity;
      user.highSchool.highSchoolLaureate = userData.highSchool.highSchoolLaureate;
      user.highSchool.contestLaureate = userData.highSchool.contestLaureate;

      this.setState({
        user,
      });
    }
  }

  render() {
    return (
      <Fragment>
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
                <Link to={`/admin/users/${this.props.match.params.userId}/high-school/edit`} className="btn btn-primary">Edytuj</Link>
              </Actions>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHeaderCell>Ukończona szkoła średnia</TableHeaderCell>
                    <TableCell>{this.state.user.highSchool.completedHighSchool}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Rok ukończenia szkoły średniej</TableHeaderCell>
                    <TableCell>{this.state.user.highSchool.highSchoolCompletionYear}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Miejscowość ukończenia szkoły średniej</TableHeaderCell>
                    <TableCell>{this.state.user.highSchool.highSchoolCompletionCity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Laureat ukończenia szkoły średniej</TableHeaderCell>
                    <TableCell>{this.state.user.highSchool.highSchoolLaureate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Laureat olimpiad</TableHeaderCell>
                    <TableCell>{this.state.user.highSchool.contestLaureate}</TableCell>
                  </TableRow>
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

export default connect(mapStateToProps)(HighSchoolPage);
