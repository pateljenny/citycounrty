import React, { Component } from 'react';
import { Card, Row, Col, CardBody, CardTitle, CardText, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as productaction from '../../action/product';
import * as deleteaction from '../../action/deleteProduct';
import { baseUrl } from '../../path';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            activeId: ''
        };

        this.toggle = this.toggle.bind(this);
        this.btnRemoveToggle = this.btnRemoveToggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    btnUpdate = (id) => {
        this.props.history.push({
            pathname: '/update-product/' + id
        })
    }

    btnShow = (id) => {
        this.props.history.push({
            pathname: '/product-detail/' + id
        })
    }

    btnRemoveToggle(id) {
        this.setState({
            modal: !this.state.modal,
            activeId: id
        });
    }

    componentWillMount() {
        this.props.action.fetchProduct.getProduct();
    }

    componentDidUpdate(prevProps) {
        if (_.isEqual(this.props.products, prevProps.products)) {
            this.props.action.fetchProduct.getProduct();
        }
        else {

        }

    }

    btnConfirm_Click = () => {
        this.toggle();
        this.props.action.deleteProduct.deleteProduct(this.state.activeId);
    }

    renderDeleteConfirmationModal = () => (
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Delete Confirmation</ModalHeader>
            <ModalBody>
                Are you sure you want to delete it??
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.btnConfirm_Click}>Yes</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>No</Button>
            </ModalFooter>
        </Modal>
    );

    renderCard = (product) => {
        var image = [];
        if (product.image) {
            for (var i = 0; i < product.image.length; i++) {
                image[i] = product.image[i];
            }
        }
        const url = baseUrl + "/";
        return (
            <Col sm="3" key={product.id}>
                <Card>
                    <CardBody>
                        <CardTitle>Product Name: {product.fruitsname} </CardTitle>
                        <CardSubtitle>Description:{product.description}</CardSubtitle>
                    </CardBody>

                    <img width="200" height="200" src={url + image[0]} alt="Card cap" />
                    <CardBody>
                        <CardText>Price: {product.price} rs/kg</CardText>
                        {(this.props.role === "admin") ? <button onClick={() => { this.btnRemoveToggle(product.id) }}>Delete</button> : null}{' '}
                        {(this.props.role === "admin") ? <button onClick={() => { this.btnUpdate(product.id) }}>Update</button> : null}{' '}
                        <button onClick={() => { this.btnShow(product.id) }}>Show Details</button>
                    </CardBody>
                </Card>
                {this.renderDeleteConfirmationModal()}
            </Col>
        );
    };

    render() {
        let displayProducts = "";
        if (this.props.products) {
            displayProducts = this.props.products.length !== 0 && this.props.products.map(product => this.renderCard(product));
        }
        return (
            <div >
                <h1>Products</h1>
                <hr />
                <Row sm="10">
                    {displayProducts}
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.product.products,
        role: state.auth.role
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        fetchProduct: bindActionCreators(productaction, dispatch),
        deleteProduct: bindActionCreators(deleteaction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
