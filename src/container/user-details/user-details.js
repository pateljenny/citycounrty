import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authAction from '../../action/auth';

class UserDetails extends Component {

    componentDidMount() {
        this.props.action.onGetUsers.GetUser();
    }

    renderTable = (users) => {
        return (
            <tbody>
                <tr>
                    <th scope="row">{users.id}</th>
                    <td>{users.email}</td>
                    {/* <td><button>Delete</button></td> */}
                </tr>
            </tbody>
        );
    }
    render() {
        let users = "";
        if (this.props.users) {
            users = this.props.users.map(user => this.renderTable(user));
        }
        return (
            <div>
                <h1>Registered Users</h1>
                <hr />
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        {users}
                    </Table>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.auth.users
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        onGetUsers: bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);