import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Container from '../../../common/page/container/Container';
import Row from '../../../common/page/row/Row';
import Sidebar from '../../../common/page/sidebar/Sidebar';
import UserSidebarNav from '../../../common/page/sidebar/nav/user/UserSidebarNav';
import Content from '../../../common/page/content/Content';
import Table from '../../../common/table/Table';
import TableBody from '../../../common/table/body/TableBody';
import TableRow from '../../../common/table/row/TableRow';
import TableCell from '../../../common/table/cell/TableCell';
import TableHeaderCell from '../../../common/table/cell/header/TableHeaderCell';

class MailingAddressPage extends Component {
  state = {
    user: {
      mailingAddress: {
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
    const userResponse = await axios.get(`/users/${this.props.userId}`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    });
    const userData = userResponse.data;

    if (userData.mailingAddress) {
      const user = { ...this.state.user };
      user.mailingAddress.voivodeship = userData.mailingAddress.voivodeship;
      user.mailingAddress.city = userData.mailingAddress.city;
      user.mailingAddress.street = userData.mailingAddress.street;
      user.mailingAddress.zipCode = userData.mailingAddress.zipCode;
      user.mailingAddress.postOffice = userData.mailingAddress.postOffice;
      user.mailingAddress.phoneNumer = userData.mailingAddress.phoneNumer;

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
                    <TableHeaderCell>Województwo</TableHeaderCell>
                    <TableCell>{this.state.user.mailingAddress.voivodeship}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Miasto</TableHeaderCell>
                    <TableCell>{this.state.user.mailingAddress.city}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Ulica</TableHeaderCell>
                    <TableCell>{this.state.user.mailingAddress.street}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Kod pocztowy</TableHeaderCell>
                    <TableCell>{this.state.user.mailingAddress.zipCode}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Poczta</TableHeaderCell>
                    <TableCell>{this.state.user.mailingAddress.postOffice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Numer telefonu</TableHeaderCell>
                    <TableCell>{this.state.user.mailingAddress.phoneNumer}</TableCell>
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

export default connect(mapStateToProps)(MailingAddressPage);
