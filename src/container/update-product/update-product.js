import React, { Component } from 'react';
import { Label, Input, Form, FormGroup, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as productIdAction from '../../action/product';
import * as updateAction from '../../action/updateProduct';

class UpdateProduct extends Component {
    state = {
        fruitsname: '',
        description: '',
        price: 0
    }

    onForm_Submit(e) {
        let fruits = {
            fruitsname: this.state.fruitsname,
            description: this.state.description,
            price: this.state.price
        }
        if (fruits.fruitsname === '') {
            fruits.fruitsname = e.fruitsname;
        }
        if (fruits.description === '') {
            fruits.description = e.description;
        }
        if (fruits.price === 0) {
            fruits.price = e.price;
        }

        const { match: { params } } = this.props;
        this.props.action.onUpdateProduct.updateProduct(params.id, fruits);
        this.props.action.fetchProduct.getProduct();
        this.props.history.push('/');
    }



    // componentWillReceiveProps(nextProps, prevState) {
    //     debugger;
    //     //this.props.history.push('/');
    // }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.props.action.OnGetProductById.getProductById(params.id);
    }

    changeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    renderForm = (product) => {
        return (
            <Container key={product.id}>
                <Form>
                    <FormGroup>
                        <Label for="fruitsname">Fruit Name</Label>
                        <Input type="text" name="fruitsname" id="fruitsname" defaultValue={product.fruitsname} onChange={this.changeHandler.bind(this)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" id="description" defaultValue={product.description} onChange={this.changeHandler.bind(this)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input type="text" name="price" id="price" defaultValue={product.price} onChange={this.changeHandler.bind(this)} />
                    </FormGroup>
                    <button type="submit" onClick={this.onForm_Submit.bind(this, product)}>Update Product</button>
                </Form>
            </Container>
        );
    };

    render() {
        let displayProduct = "";
        if (this.props.product) {
            displayProduct = this.props.product.map(product => this.renderForm(product))
        }

        return (
            <div>
                <h1>Update Product</h1>
                <hr />
                {displayProduct}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        product: state.product.get_product_by_id,
        products: state.product.products
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        OnGetProductById: bindActionCreators(productIdAction, dispatch),
        onUpdateProduct: bindActionCreators(updateAction, dispatch),
        fetchProduct: bindActionCreators(productIdAction, dispatch),

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);