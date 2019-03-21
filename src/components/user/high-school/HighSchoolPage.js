import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Container from '../../common/page/container/Container';
import Row from '../../common/page/row/Row';
import Sidebar from '../../common/page/sidebar/Sidebar';
import UserSidebarNav from '../../common/page/sidebar/nav/user/UserSidebarNav';
import Content from '../../common/page/content/Content';
import Table from '../../common/table/Table';
import TableBody from '../../common/table/body/TableBody';
import TableRow from '../../common/table/row/TableRow';
import TableCell from '../../common/table/cell/TableCell';
import TableHeaderCell from '../../common/table/cell/header/TableHeaderCell';

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
    const userResponse = await axios.get(`/users/${this.props.userId}`, {
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
        <Container>
          <Row>
            <Sidebar>
              <UserSidebarNav />
            </Sidebar>
            <Content>
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
