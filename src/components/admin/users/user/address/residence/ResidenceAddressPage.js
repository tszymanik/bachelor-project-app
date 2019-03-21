import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import PageHeader from '../../../../../common/page/header/PageHeader';
import PageTitle from '../../../../../common/page/title/PageTitle';
import PageSubtitle from '../../../../../common/page/subtitle/PageSubtitle';
import Container from '../../../../../common/page/container/Container';
import Row from '../../../../../common/page/row/Row';
import Sidebar from '../../../../../common/page/sidebar/Sidebar';
import AdminUserSidebarNav from '../../../../../common/page/sidebar/nav/admin/user/AdminUserSidebarNav';
import Content from '../../../../../common/page/content/Content';
import Actions from '../../../../../common/page/actions/Actions';
import Table from '../../../../../common/table/Table';
import TableBody from '../../../../../common/table/body/TableBody';
import TableRow from '../../../../../common/table/row/TableRow';
import TableCell from '../../../../../common/table/cell/TableCell';
import TableHeaderCell from '../../../../../common/table/cell/header/TableHeaderCell';

class ResidenceAddressPage extends Component {
  state = {
    user: {
      residenceAddress: {
        voivodeship: '',
        city: '',
        street: '',
        zipCode: '',
        postOffice: '',
        phoneNumer: '',
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

    if (userData.residenceAddress) {
      const user = { ...this.state.user };
      user.residenceAddress.voivodeship = userData.residenceAddress.voivodeship;
      user.residenceAddress.city = userData.residenceAddress.city;
      user.residenceAddress.street = userData.residenceAddress.street;
      user.residenceAddress.zipCode = userData.residenceAddress.zipCode;
      user.residenceAddress.postOffice = userData.residenceAddress.postOffice;
      user.residenceAddress.phoneNumer = userData.residenceAddress.phoneNumer;

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
                <Link to={`/admin/users/${this.props.match.params.userId}/address/residence/edit`} className="btn btn-primary">Edytuj</Link>
              </Actions>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHeaderCell>Województwo</TableHeaderCell>
                    <TableCell>{this.state.user.residenceAddress.voivodeship}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Miasto</TableHeaderCell>
                    <TableCell>{this.state.user.residenceAddress.city}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Ulica</TableHeaderCell>
                    <TableCell>{this.state.user.residenceAddress.street}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Kod pocztowy</TableHeaderCell>
                    <TableCell>{this.state.user.residenceAddress.zipCode}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Poczta</TableHeaderCell>
                    <TableCell>{this.state.user.residenceAddress.postOffice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Numer telefonu</TableHeaderCell>
                    <TableCell>{this.state.user.residenceAddress.phoneNumer}</TableCell>
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

export default connect(mapStateToProps)(ResidenceAddressPage);
