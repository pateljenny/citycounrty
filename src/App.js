import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';

import Login from './container/login/login';
import Register from './container/registration/register';
import Header from './container/header/header';
import Products from './container/products/products';
import AddProduct from './container/add-product/add-product';
import UpdateProduct from './container/update-product/update-product';
import CRoute from './customRoute/customRoute';
import PageNotFound from './page-not-found/page-not-found';
import UnAuthorizedAccess from './unauthorized-access/unauthorized-access';
import ProductDetails from './container/product-detail/product-detail';
import UserDetails from './container/user-details/user-details';
import ProductCheckout from './container/product-checkout/product-checkout';
import Cart from './container/my-cart/Cart';

// import RegistrationClient from './container/A_Registration_Again/registration-client-pagination';
// import RegistrationServer from './container/A_Registration_Again/registration-server-pagination';

class App extends Component {
    render() {
        const admin = "admin";
        return (
            <div>
                <Header />
                <Switch>
                    <CRoute exact path="/" component={Products}></CRoute>
                    <CRoute exact path="/login" component={Login}></CRoute>
                    <CRoute exact path="/register" component={Register}></CRoute>

                    {/* <CRoute exact path="/registrationclient" component={RegistrationClient}></CRoute>
                    <CRoute exact path="/registrationserver" component={RegistrationServer}></CRoute> */}

                    <CRoute cprivate exact path="/add-product" crole={[admin]} component={AddProduct}></CRoute>
                    <CRoute cprivate exact path="/update-product/:id" crole={[admin]} component={UpdateProduct}></CRoute>
                    <CRoute exact path="/product-detail/:id" component={ProductDetails}></CRoute>
                    <CRoute cprivate exact path="/product-checkout/:fid" component={ProductCheckout}></CRoute>
                    <CRoute exact cprivate path="/cart" component={Cart}></CRoute>
                    <CRoute cprivate exact path="/users" crole={[admin]} component={UserDetails}></CRoute>
                    <CRoute exact path="/unauthorized-access" component={UnAuthorizedAccess}></CRoute>
                    <CRoute path="*" component={PageNotFound}></CRoute>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);