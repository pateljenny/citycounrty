import React, { Component } from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as authAction from '../../action/auth.js';

class Header extends Component {
    btnLogout_Click(e) {
        e.preventDefault();
        this.props.action.auth.logoutUser();
    }

    render() {
        return (
            // (this.props.auth.token && this.props.auth.token !== "") ? 
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">Demo Project</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    {(this.props.auth.role === "admin") ? <NavItem>
                        <NavLink tag={Link} to="/add-product">Add Product</NavLink>
                    </NavItem> : null}
                    <NavItem>
                        <NavLink tag={Link} to="/">Products</NavLink>
                    </NavItem>
                    {(this.props.auth.role === "user") ? <NavItem>
                        <NavLink tag={Link} to="/cart">My Cart</NavLink>
                    </NavItem> : null}
                    {(this.props.auth.role === "admin") ? <NavItem>
                        <NavLink tag={Link} to="/users">Users</NavLink>
                    </NavItem> : null}
                    {/* <NavLink tag={Link} to="/registrationclient">Registration Client</NavLink>
                    <NavLink tag={Link} to="/registrationserver">Registration Server</NavLink> */}
                    <NavItem>
                        {(this.props.auth.token && this.props.auth.token !== "") ? <Button onClick={this.btnLogout_Click.bind(this)}>Logout</Button> :
                            <Button tag={Link} to="/login">Login</Button>}
                    </NavItem>
                </Nav>
            </Navbar>
            // : null
        );
    }
}
const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth: auth
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        auth: bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)