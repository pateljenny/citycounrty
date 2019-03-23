import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Table } from 'reactstrap';

import * as cartAction from '../../action/addToCart';
import { baseUrl } from '../../path';

const url = baseUrl + "/";

class Cart extends Component {

    componentDidMount() {
        this.props.action.OnGetCart.getCart(this.props.userId);
    }
    
    componentDidUpdate(){
        this.props.action.OnGetCart.getCart(this.props.userId);
    }

    btnDelete_Click = (fruitId) => {        
        this.props.action.onDeleteCart.deleteCart(fruitId);
    }

    renderCart = (cart) => {        
        if (parseInt(this.props.userId) && parseInt(this.props.userId) === cart.userId) {
            return (
                <tbody key={cart.id}>
                    <tr>
                        <td><img src={url + cart.image[0]} height="50" width="50" alt="pic" /></td>
                        <td>{cart.fruitsname}</td>
                        <td>{cart.quantity}</td>
                        <td>{cart.price}</td>                        
                        <td><button onClick={() => this.btnDelete_Click(cart.fruitId)}>Delete</button></td>
                    </tr>
                </tbody>
            );
        }      
    }

    render() {        
        var displayCart = "";

        if (this.props.getCartData) {
            displayCart = this.props.getCartData.map(cart => this.renderCart(cart));
        }
        return (
            <div>
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th>Fruit</th>
                                <th>Fruit Name</th>
                                <th>Quantity</th>
                                <th>Price</th>                               
                                <th>Action</th>
                            </tr>
                        </thead>
                        {displayCart}
                    </Table>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        getCartData: state.product.cart_list,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        OnGetCart: bindActionCreators(cartAction, dispatch),
        onDeleteCart: bindActionCreators(cartAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);