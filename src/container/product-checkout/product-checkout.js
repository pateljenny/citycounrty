import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Form, FormGroup, Label, Input, Container, Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as deliveryAction from '../../action/addDeliveryData';
import * as cartAction from '../../action/addToCart';
import * as orderAction from '../../action/orderProduct';
import { baseUrl } from '../../path';

const IndianState = ['Gujarat', 'Maharastra', 'Rajasthan'];
const ChineseState = ['Fujian', 'Yunnan', 'Henan'];

class ProductCheckout extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            country: 'India',
            address: "",
            state: "Gujarat",
            pincode: "",
            contactNo: "",
            deliveryId: ""
        };
    }

    componentDidMount() {
        this.props.action.onFetchDeliveryData.getDeliveryByUser(this.props.userId);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    onChangeHandler(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }

    btnDelivery_Click = (e) => {
        e.preventDefault();
        const userId = parseInt(this.props.userId);
        const address = this.state.address;
        const state = this.state.state;
        const country = this.state.country;
        const pincode = parseInt(this.state.pincode);
        const contactNo = this.state.contactNo;
        var data = {
            userId,
            address,
            state,
            country,
            pincode,
            contactNo
        }
        this.props.action.onAddDeliveryData.addDeliveryDetails(data);
        const { match: { params } } = this.props;
        this.props.action.onFetchOrderSummary.getCartByFruit(params.fid);
        this.setState({ activeTab: 3 });
        this.toggle('3');
    }

    btnOrderCancel_Click() {
        this.props.history.push('/')
    }

    btnOrder_Click(list) {        
        this.props.action.onFetchDeliveryData.getDeliveryByUser(this.props.userId);
        let deliveryid = "";
        let flag = false;
        if (this.props.delivery_data) {
            this.props.delivery_data.map(delivery => {
                deliveryid = delivery.id;
                if (delivery.userId === parseInt(this.props.userId)) {
                    flag = true;
                }
                return true;
            })
        }
        if (flag) {
            deliveryid = parseInt(deliveryid);
        }
        else {
            deliveryid = parseInt(this.props.deliveryId);
        }
        const userId = parseInt(this.props.userId);
        const fruitId = list.id;
        const deliveryId = deliveryid;
        const quantity = list.quantity;
        const totalPrice = list.price;
        var data = {
            userId,
            fruitId,
            deliveryId,
            quantity,
            totalPrice
        }
        this.props.action.onOrder.addOrder(data);
        alert("Your product is been ordered!!!");
        this.props.action.onOrderUpdateCart.UpdateOrderedCart(fruitId, userId);
        this.props.history.push('/');
    }

    onProceed() {
        this.setState({ activeTab: 2 });
        this.toggle('2');
    }
    onProceedahead() {
        const { match: { params } } = this.props;
        this.props.action.onFetchOrderSummary.getCartByFruit(params.fid);
        //this.props.delivery_data()
        this.setState({ activeTab: 3 });
        this.toggle('3');
    }

    render() {
        const url = baseUrl + "/";
        let showOrderSummary = "";
        if (this.props.cart_fruit_list) {
            showOrderSummary = (this.props.cart_fruit_list.map(list => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card>
                            <CardHeader>Your Order Summary</CardHeader>
                            <CardBody>
                                <CardTitle>Product Name :{list.fruitsname}</CardTitle>
                                <CardText>Quantity :{list.quantity}</CardText>
                                <CardText>Price :{list.price}</CardText>
                                <CardText>Image: <img alt="product pic" src={url + list.image[0]} height="100" width="100" /></CardText>
                                <CardText>Payment Mode:<b> Cash On Delivery</b></CardText>
                                <Button onClick={this.btnOrderCancel_Click.bind(this)}>Cancel</Button>{' '}
                                <Button onClick={this.btnOrder_Click.bind(this, list)}>Order Now</Button>
                            </CardBody>
                        </Card>
                    </div>
                );
            }));
        }
        let flag = false;
        if (this.props.delivery_data) {
            this.props.delivery_data.map(delivery => {
                if (delivery.userId === parseInt(this.props.userId)) {
                    flag = true;
                }
                return flag;
            })
        }
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}>
                            {/* // onClick={() => { this.toggle('1'); }}> */}
                            Login Details</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}>
                            {/* onClick={() => { this.toggle('2'); }}> */}
                            Delivery Details</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}>
                            {/* onClick={() => { this.toggle('3'); }}> */}
                            Order Summary</NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>

                    <TabPane tabId="1">
                        <Row>
                            <Col sm="6">
                                {(!this.props.role) ? <Container>
                                    <h1>Login</h1>
                                    <hr />
                                    <Form>
                                        <FormGroup>
                                            <Label for="Email">Email</Label>
                                            <Input type="email" name="email" placeholder="Email" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="Password">Password</Label>
                                            <Input type="password" name="password" placeholder="Password" />
                                        </FormGroup>
                                        <button>Login</button>
                                    </Form>
                                </Container> :
                                    <Container>
                                        <h4>You are Logged In!!Proceed for Delivery Details</h4>
                                        <button onClick={this.onProceed.bind(this)}>Proceed with DeliveryDetails</button>
                                    </Container>
                                }
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <Container>
                                    <h4>Delivery Contents</h4>
                                    <hr />
                                    {!flag ?
                                        <Form border="1" encType="multipart/form-data">
                                            <FormGroup>
                                                <Label for="address">Address</Label>
                                                <Input type="textarea" name="address" id="address" onChange={this.onChangeHandler.bind(this)} value={this.state.address} placeholder="Full Address" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="country">Choose Country </Label>
                                                <Input type="select" name="country" id="country" onChange={this.onChangeHandler.bind(this)} defaultValue={this.state.country}>
                                                    <option value="India">India</option>
                                                    <option value="China">China</option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="state">Choose State of India </Label>
                                                <Input type="select" name="state" id="state" onChange={this.onChangeHandler.bind(this)}>
                                                    {(this.state.country === "India") ? IndianState.map(state => {
                                                        return <option>{state}</option>
                                                    }) : ChineseState.map(state => {
                                                        return <option>{state}</option>
                                                    })}
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="pincode">Pincode</Label>
                                                <Input type="text" name="pincode" id="pincode" value={this.state.pincode} placeholder="Pincode" onChange={this.onChangeHandler.bind(this)} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="contactNo">Contact No.</Label>
                                                <Input type="text" name="contactNo" id="contactNo" placeholder="contactNo" value={this.state.contactNo} onChange={this.onChangeHandler.bind(this)} />
                                            </FormGroup>
                                            <button type="submit" onClick={this.btnDelivery_Click.bind(this)}>Add Delivery Details</button>
                                        </Form> :
                                        <Container>
                                            <h4>You have filled your Delivery Details.Proceed ahead!!!!</h4>
                                            <button onClick={this.onProceedahead.bind(this)}>Proceed ahead</button>
                                        </Container>
                                    }

                                </Container>



                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">

                                <hr />
                                {showOrderSummary}
                            </Col>
                        </Row>
                    </TabPane>

                </TabContent>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        role: state.auth.role,
        userId: state.auth.userId,
        cart_fruit_list: state.product.cart_fruit_list,
        delivery_data: state.product.delivery_data,
        deliveryId: state.product.deliveryId
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        onAddDeliveryData: bindActionCreators(deliveryAction, dispatch),
        onFetchOrderSummary: bindActionCreators(cartAction, dispatch),
        onFetchDeliveryData: bindActionCreators(deliveryAction, dispatch),
        onOrder: bindActionCreators(orderAction, dispatch),
        onOrderUpdateCart: bindActionCreators(cartAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductCheckout);