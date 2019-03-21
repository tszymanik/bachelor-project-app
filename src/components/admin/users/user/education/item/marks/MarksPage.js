import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import PageHeader from '../../../../../../common/page/header/PageHeader';
import PageTitle from '../../../../../../common/page/title/PageTitle';
import Container from '../../../../../../common/page/container/Container';
import Row from '../../../../../../common/page/row/Row';
import Sidebar from '../../../../../../common/page/sidebar/Sidebar';
import AdminUserSidebarNav from '../../../../../../common/page/sidebar/nav/admin/user/AdminUserSidebarNav';
import Content from '../../../../../../common/page/content/Content';
import Actions from '../../../../../../common/page/actions/Actions';
import Table from '../../../../../../common/table/Table';
import TableBody from '../../../../../../common/table/body/TableBody';
import TableRow from '../../../../../../common/table/row/TableRow';
import TableCell from '../../../../../../common/table/cell/TableCell';

class MarksPage extends Component {
  state = {
    semestersNumber: [],
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const semestersNumber = [];

    const marksResponse = await axios.get('/marks', {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
      params: {
        educationItemId: this.props.match.params.educationItemId,
      },
    });
    const marksData = marksResponse.data;
    console.log('[marksData]', marksData);

    await Promise.all(marksData.map(async (markData) => {
      const subjectResponse = await axios.get(`/subjects/${markData.subjectId}`, {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      });
      const subjectData = subjectResponse.data;

      if (!semestersNumber.includes(subjectData.semesterNumber)) {
        semestersNumber.push(subjectData.semesterNumber);
      }
    }));

    semestersNumber.sort((a, b) => a - b);

    console.log('[semesterNumbers]', semestersNumber);
    this.setState({
      semestersNumber,
    });
  }

  render() {
    return (
      <Fragment>
        <PageHeader>
          <PageTitle>Oceny</PageTitle>
        </PageHeader>
        <Container>
          <Row>
            <Sidebar>
              <AdminUserSidebarNav
                userId={this.props.match.params.userId}
                educationItemId={this.props.match.params.educationItemId}
              />
            </Sidebar>
            <Content>
              <Actions>
                <Link to={`/admin/users/${this.props.match.params.userId}/education/${this.props.match.params.educationItemId}/marks/add`} className="btn btn-primary">Dodaj</Link>
              </Actions>
              <Table>
                <TableBody>
                  {this.state.semestersNumber.map(semesterNumber => (
                    <TableRow key={semesterNumber}>
                      <TableCell>
                        <Link to={`/admin/users/${this.props.match.params.userId}/education/${this.props.match.params.educationItemId}/marks/semester/${semesterNumber}`}>Semestr {semesterNumber}</Link>
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

export default connect(mapStateToProps)(MarksPage);
