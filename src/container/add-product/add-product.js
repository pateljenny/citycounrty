import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageUploader from 'react-images-upload';

import * as addProductAction from '../../action/addProduct';
import * as productaction from '../../action/product';
import FormErrors from '../../container/FormErrors/FormErrors';


class AddProduct extends Component {
    state = {
        fruitsname: "",
        description: "",
        price: 0,
        image: [],
        formErrors: { fruitsname: '', description: '', price: 0 },
        fruitsnameValid: false,
        descriptionValid: false,
        priceValid: false,
        formValid: false,
        fields: []
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let fruitsnameValid = this.state.fruitsnameValid;
        let descriptionValid = this.state.descriptionValid;
        let priceValid = this.state.priceValid;
        switch (fieldName) {
            case 'fruitsname':
                fruitsnameValid = value.length >= 0;
                fieldValidationErrors.fruitsname = fruitsnameValid ? '' : 'Fruit name is required';
                break;
            case 'description':
                descriptionValid = value.length >= 0;
                fieldValidationErrors.description = descriptionValid ? '' : 'Description is required';
                break;
            case 'price':
                priceValid = value.length >= 0 && value >= 0;
                fieldValidationErrors.price = priceValid ? '' : 'Price should be more than 0';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            fruitsnameValid: fruitsnameValid,
            descriptionValid: descriptionValid,
            priceValid: priceValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.fruitsnameValid && this.state.descriptionValid && this.state.priceValid });
    }


    onForm_Submit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fruitsname', this.state.fruitsname);
        formData.append('description', this.state.description);
        formData.append('price', this.state.price);
        for (var i = 0; i < this.state.image.length; i++) {
            formData.append('image', this.state.image[i]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        this.props.action.onAddProduct.addProduct(formData, config);
        var redirect = this.props.action.fetchProduct.getProduct();
        this.props.history.push('/', redirect);

    }

    changeHandler(e) {
        let fields = this.state.fields;
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    }

    onDrop(pictureFiles) {
        this.setState({
            image: this.state.image.concat(pictureFiles)
        });
    }

    render() {
        return (
            <Container>
                <Form border="1" encType="multipart/form-data">
                    <h1>Add Product</h1>
                    <hr />
                    <div className="panel panel-default" style={{ "color": "red" }}>
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                    <FormGroup>
                        <Label for="fruitsname">Fruit Name</Label>
                        <Input type="text" name="fruitsname" id="fruitsname" placeholder="Fruit Name" onChange={this.changeHandler.bind(this)} value={this.state.fruitsname} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" id="description" onChange={this.changeHandler.bind(this)} value={this.state.description} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Image Upload</Label>
                        <ImageUploader
                            withIcon={true}
                            buttonText="Choose Images"
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            onChange={this.onDrop.bind(this)}
                            withPreview={true}
                            maxFileSize={5242880}
                            withLabel={false} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input type="text" name="price" id="price" placeholder="Price" onChange={this.changeHandler.bind(this)} value={this.state.price} />
                    </FormGroup>
                    <button type="submit" disabled={!this.state.formValid} onClick={this.onForm_Submit.bind(this)}>Add Product</button>
                </Form>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        onAddProduct: bindActionCreators(addProductAction, dispatch),
        fetchProduct: bindActionCreators(productaction, dispatch)
    }
})

export default connect(null, mapDispatchToProps)(AddProduct);