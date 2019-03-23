import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import ImageUploader from 'react-images-upload';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import _ from 'lodash';

import * as countryAction from '../../action/getCountry';
import * as stateAction from '../../action/getState';
import * as addregisterAction from '../../action/addRegisterData';

class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,

            name: "",
            email: "",
            countryId: 0,
            stateId: 0,
            salary: 0,
            image: []
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        this.props.action.onGetCountry.getCountry();
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    countryHandler(e) {
        let countryId = e.target.value;
        this.setState({ countryId: countryId });
        this.props.action.onGetState.getState(countryId);
    }

    changeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    imageHandler(pictureFiles) {
        this.setState({ image: pictureFiles });
    }

    btnAdd_Click(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('email', this.state.email);
        formData.append('countryId', parseInt(this.state.countryId));
        formData.append('stateId', parseInt(this.state.stateId));
        formData.append('salary', this.state.salary);
        formData.append('image', this.state.image[0]);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        this.props.action.onAddData.addRegisterData(formData, config);
        this.toggleModal();
    }

    renderAddModal() {
        let countryoption = "";
        let stateoption = "";
        if (this.props.country) {
            countryoption = this.props.country.map(country => {
                return (<option key={country.countryId} value={country.countryId}>{country.countryName}</option>)
            })
        }
        if (this.props.state) {
            stateoption = this.props.state.map(state => {
                return (<option key={state.stateId} value={state.stateId}>{state.stateName}</option>)
            })
        }
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>Add Details</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.changeHandler.bind(this)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="test@test.com" value={this.state.email} onChange={this.changeHandler.bind(this)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="countryId">Country</Label>
                                <Input type="select" name="countryId" id="countryId" onChange={this.countryHandler.bind(this)}>
                                    <option>Select Country</option>
                                    {countryoption}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="stateId">State</Label>
                                <Input type="select" name="stateId" id="stateId" onChange={this.changeHandler.bind(this)}>
                                    <option>Select State</option>
                                    {stateoption}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="salary">Salary</Label>
                                <Input type="text" name="salary" id="salary" placeholder="Salary" value={this.state.salary} onChange={this.changeHandler.bind(this)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="image">Image Upload</Label>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText="Select Images"
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    withPreview={true}
                                    onChange={this.imageHandler.bind(this)}
                                    maxFileSize={5242880}
                                    withLabel={false} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.btnAdd_Click.bind(this)}>Add</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    render() {
        return (
            <div style={{ "float": "right" }}>
                <Button color="success" onClick={this.toggleModal} >Add</Button>
                {this.renderAddModal()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        country: state.country.country,
        state: state.state.state
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        onGetCountry: bindActionCreators(countryAction, dispatch),
        onGetState: bindActionCreators(stateAction, dispatch),
        onAddData: bindActionCreators(addregisterAction, dispatch),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);