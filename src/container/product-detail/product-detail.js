import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardHeader, CardFooter, CardBody, CardTitle, CardText, Col, Row, Table, Button } from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import * as productIdAction from '../../action/product';
import * as cartAction from '../../action/addToCart';
import { baseUrl } from '../../path';

const url = baseUrl + "/";

class ProductDetails extends Component {
    state = {
        photoIndex: 0,
        isOpen: false
    }

    componentDidMount() {
        this.props.action.OnGetCart.getCart(this.props.userId);
    }

    imageDisplay = (image) => {
        document.getElementById("productImage").src = image;
    }

    backButtonHandler() {
        this.props.history.push('/');
    }

    openImage = () => {
        this.setState({
            isOpen: true
        })
    }


    buyNowHandler = (fruitid) => {
        const userId = parseInt(this.props.userId);
        const fruitId = fruitid;
        const quantity = 1;
        var data = {
            userId,
            fruitId,
            quantity
        }
        let flag = false;
        if (this.props.getCartData) {
            this.props.getCartData.map(cart => {
                if (cart.userId === parseInt(this.props.userId)) {
                    if (cart.fruitId === fruitid) {
                        flag = true;
                    }
                }
                return flag;
            })
            if (!flag) {
                this.props.action.onAddToCart.addToCart(data);
            }
        }
        this.props.history.push({
            pathname: '/product-checkout/' + fruitid
        })
    }

    addToCartHandler = (id) => {
        alert("Your product is added to cart!!!");
        const userId = parseInt(this.props.userId);
        const fruitId = id;
        const quantity = 1;
        var data = {
            userId,
            fruitId,
            quantity
        }
        this.props.action.onAddToCart.addToCart(data);
    }

    renderData = (product) => {

        return (
            <div key={product.id} style={{ display: 'flex', justifyContent: 'center' }}>
                <Row sm="12">
                    <hr />
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                {product.fruitsname}'s Detail {' '}
                                <button onClick={this.backButtonHandler.bind(this)}>Back To Product List</button>
                            </CardHeader>
                            <CardBody>
                                <CardTitle>Product Name : {product.fruitsname}</CardTitle>
                                <CardText>Description : {product.description}</CardText>
                                <CardText>Price : {product.price}</CardText>
                            </CardBody>
                            <CardFooter>Product Image</CardFooter>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td colSpan="3" align="center"><img id="productImage" onClick={this.openImage.bind(this)} src={url + product.image[0]} alt="Product" height="250px" width="250px" /></td>
                                    </tr>
                                    <tr>
                                        {product.image.map(image => {
                                            return <td key={image}><img src={url + image} alt="Product" height="100px" width="100px" onClick={() => this.imageDisplay(url + image)} /></td>
                                        })}
                                    </tr>
                                </tbody>
                            </Table>
                            <CardFooter>
                                {(this.props.role === "user") ? <Button onClick={this.addToCartHandler.bind(this, product.id)}>Add To Cart</Button> : null}{' '}{' '}
                                {(this.props.role !== "admin") ? <Button onClick={this.buyNowHandler.bind(this, product.id)}>Buy Now</Button> : null}
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

    componentWillMount() {
        const { match: { params } } = this.props;
        this.props.action.OnGetProductById.getProductById(params.id);
    }

    render() {
        var image = [];
        const { photoIndex, isOpen } = this.state;
        let displayProduct = "";
        if (this.props.product) {
            displayProduct = this.props.product.map(product => this.renderData(product))
        }
        if (this.props.product) {
            this.props.product.map(product => {
                for (var i = 0; i < product.image.length; i++) {
                    image[i] = url + product.image[i];
                }
                return '';
            })

        }
        return (
            <div>
                {displayProduct}

                {isOpen && (
                    <Lightbox mainSrc={image[photoIndex]}
                        nextSrc={image[(photoIndex + 1) % image.length]}
                        prevSrc={image[(photoIndex + image.length - 1) % image.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + image.length - 1) % image.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % image.length,
                            })
                        } />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        product: state.product.get_product_by_id,
        role: state.auth.role,
        userId: state.auth.userId,
        getCartData: state.product.cart_list,
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        OnGetProductById: bindActionCreators(productIdAction, dispatch),
        onAddToCart: bindActionCreators(cartAction, dispatch),
        OnGetCart: bindActionCreators(cartAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);