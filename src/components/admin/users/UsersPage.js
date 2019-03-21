import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import PageHeader from '../../common/page/header/PageHeader';
import PageTitle from '../../common/page/title/PageTitle';
import Container from '../../common/page/container/Container';
import Actions from '../../common/page/actions/Actions';
import Table from '../../common/table/Table';
import TableHead from '../../common/table/head/TableHead';
import TableBody from '../../common/table/body/TableBody';
import TableRow from '../../common/table/row/TableRow';
import TableCell from '../../common/table/cell/TableCell';
import TableHeaderCell from '../../common/table/cell/header/TableHeaderCell';
import ButtonPrimary from '../../common/button/primary/ButtonPrimary';
import Modal from '../../common/modal/Modal';

class UsersPage extends Component {
  state = {
    users: [],
    modal: {
      show: false,
      params: {
        userId: '',
      },
    },
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const usersResponse = await axios.get('/users', {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
    });
    const usersData = usersResponse.data;

    const users = [];

    await Promise.all(usersData.map(async (userData) => {
      const typesOfUserData = [];
      const { typesOfUserId } = userData;

      await Promise.all(typesOfUserId.map(async (typeOfUserId) => {
        const typeOfUserResponse = await axios.get(`/types-of-user/${typeOfUserId}`, {
          headers: {
            Authorization: `Bearer ${this.props.token}`,
          },
        });

        const typeOfUserData = typeOfUserResponse.data;
        typesOfUserData.push(typeOfUserData);
      }));

      const user = { ...userData };
      user.typesOfUser = typesOfUserData;
      users.push(user);
    }));

    this.setState({
      users,
    });
  }

  handleShowModal = userId => () => {
    const modal = { ...this.state.modal };
    modal.show = true;
    modal.params.userId = userId;

    this.setState({
      modal,
    });
  }

  handleHideModal = () => {
    const modal = { ...this.state.modal };
    modal.show = false;
    modal.params.userId = '';

    this.setState({
      modal,
    });
  }

  handleDeleteUser = () => {
    axios.delete(
      `/users/${this.state.modal.params.userId}`,
      {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      },
    )
      .then(() => {
        const modal = { ...this.state.modal };
        modal.show = false;

        let users = [...this.state.users];
        users = users.filter(user => user.id !== this.state.modal.params.userId);

        this.setState({
          modal,
          users,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let modal = null;
    if (this.state.modal.show) {
      modal = <Modal title="Usuń użytkownika" hide={this.handleHideModal} confirm={this.handleDeleteUser}>Czy na pewno usunąć użytkownika?</Modal>;
    }

    return (
      <Fragment>
        {modal}
        <PageHeader>
          <PageTitle>Użytkownicy</PageTitle>
        </PageHeader>
        <Container>
          <Actions>
            <Link to="/admin/users/add" className="btn btn-primary">Dodaj</Link>
          </Actions>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Id</TableHeaderCell>
                <TableHeaderCell>Typ użytkownika</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Imię</TableHeaderCell>
                <TableHeaderCell>Nazwisko</TableHeaderCell>
                <TableHeaderCell />
                <TableHeaderCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {user.typesOfUser.map((typeOfUser, index, array) => {
                      if (index !== (array.length - 1)) {
                        return `${typeOfUser.name}, `;
                      }
                      return typeOfUser.name;
                    })}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>
                    <Link to={`/admin/users/${user.id}`} className="btn btn-primary">Pokaż</Link>
                  </TableCell>
                  <TableCell>
                    <ButtonPrimary onClick={this.handleShowModal(user.id)}>Usuń</ButtonPrimary>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

export default withRouter(connect(mapStateToProps)(UsersPage));
