import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

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

class GeneralPage extends Component {
  state = {
    user: {
      id: '',
      typesOfUser: [],
      email: '',
      firstName: '',
      secondName: '',
      lastName: '',
      title: '',
      pesel: '',
      dateOfBirth: '',
      fatherName: '',
      motherName: '',
      sex: '',
      maidenName: '',
      maritalStatus: '',
      citizenship: '',
      nationality: '',
      placeOfBirth: '',
      voivodeshipOfBirth: '',
      workEmail: '',
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
    const { typesOfUserId } = userData;

    const typesOfUserData = [];
    await Promise.all(typesOfUserId.map(async (typeOfUserId) => {
      const typeOfUserResponse = await axios.get(`/types-of-user/${typeOfUserId}`, {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      });
      const typeOfUserData = typeOfUserResponse.data;
      typesOfUserData.push(typeOfUserData);
    }));

    const user = { ...this.state.user };
    user.id = userData.id;
    user.typesOfUser = typesOfUserData;
    user.email = userData.email;
    user.firstName = userData.firstName;
    user.secondName = userData.secondName;
    user.lastName = userData.lastName;
    user.title = userData.title;
    user.pesel = userData.pesel;

    const { dateOfBirth } = userData;
    if (dateOfBirth) {
      user.dateOfBirth = moment(userData.dateOfBirth).format('DD-MM-YYYY');
    }

    user.fatherName = userData.fatherName;
    user.motherName = userData.motherName;
    user.sex = userData.sex;
    user.maidenName = userData.maidenName;
    user.maritalStatus = userData.maritalStatus;
    user.citizenship = userData.citizenship;
    user.nationality = userData.nationality;
    user.placeOfBirth = userData.placeOfBirth;
    user.voivodeshipOfBirth = userData.voivodeshipOfBirth;
    user.workEmail = userData.workEmail;

    this.setState({
      user,
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
                <TableBody>
                  <TableRow>
                    <TableHeaderCell>Identyfikator</TableHeaderCell>
                    <TableCell>{this.state.user.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Typ użytkownika</TableHeaderCell>
                    <TableCell>
                      {this.state.user.typesOfUser.map((typeOfUser, index, array) => {
                        if (index !== (array.length - 1)) {
                          return `${typeOfUser.name}, `;
                        }
                        return typeOfUser.name;
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Email</TableHeaderCell>
                    <TableCell>{this.state.user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Imię</TableHeaderCell>
                    <TableCell>{this.state.user.firstName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Drugie imię</TableHeaderCell>
                    <TableCell>{this.state.user.secondName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Nazwisko</TableHeaderCell>
                    <TableCell>{this.state.user.lastName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Tytuł</TableHeaderCell>
                    <TableCell>{this.state.user.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Pesel</TableHeaderCell>
                    <TableCell>{this.state.user.pesel}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Data urodzenia</TableHeaderCell>
                    <TableCell>{this.state.user.dateOfBirth}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Imię ojca</TableHeaderCell>
                    <TableCell>{this.state.user.fatherName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Imię matki</TableHeaderCell>
                    <TableCell>{this.state.user.motherName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Płeć</TableHeaderCell>
                    <TableCell>{this.state.user.sex}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Nazwisko panieńskie</TableHeaderCell>
                    <TableCell>{this.state.user.maidenName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Stan cywilny</TableHeaderCell>
                    <TableCell>{this.state.user.maritalStatus}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Obywatelstwo</TableHeaderCell>
                    <TableCell>{this.state.user.citizenship}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Narodość</TableHeaderCell>
                    <TableCell>{this.state.user.nationality}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Miejsce urodzenia</TableHeaderCell>
                    <TableCell>{this.state.user.placeOfBirth}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Województwo urodzenia</TableHeaderCell>
                    <TableCell>{this.state.user.voivodeshipOfBirth}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Poczta robocza</TableHeaderCell>
                    <TableCell>{this.state.user.workEmail}</TableCell>
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

export default connect(mapStateToProps)(GeneralPage);
