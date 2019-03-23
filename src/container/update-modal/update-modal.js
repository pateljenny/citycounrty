import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageUploader from 'react-images-upload';

import * as countryAction from '../../action/getCountry';
import * as stateAction from '../../action/getState';
import * as getregisterAction from '../../action/getRegisterData';
import * as updateregisterAction from '../../action/updateRegisterData';
import { baseUrl } from '../../path';
import cancel from '../../image/cancel.png';
const url = baseUrl + "/";

class UpdateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatemodal: false,

            name: "",
            email: "",
            countryId: 0,
            stateId: 0,
            salary: 0,
            image: [],

            updateId: '',

            cancelstatus: true
        };

        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        this.btnUpdate_Click = this.btnUpdate_Click.bind(this);
    }

    toggleUpdateModal() {
        this.setState({
            updatemodal: !this.state.updatemodal,
            cancelstatus: true
        });
    }

    cancelimageHandler() {
        this.setState({ cancelstatus: false })
    }

    renderUpdateModal(data) {
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
            <div key={data.regId}>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Name" defaultValue={data.name} onChange={this.changeHandler.bind(this)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="test@test.com" defaultValue={data.email} onChange={this.changeHandler.bind(this)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="countryId">Country</Label>
                            <Input type="select" name="countryId" id="countryId" onChange={this.countryHandler.bind(this)} defaultValue={data.countryId}>
                                {countryoption}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="stateId">State</Label>
                            <Input type="select" name="stateId" id="stateId" onChange={this.changeHandler.bind(this)} defaultValue={data.stateId}>
                                {stateoption}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="salary">Salary</Label>
                            <Input type="text" name="salary" id="salary" placeholder="Salary" defaultValue={data.salary} onChange={this.changeHandler.bind(this)} />
                        </FormGroup>
                        {!this.state.cancelstatus ? <FormGroup>
                            <div>
                                <Label for="image">Image Upload</Label>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText="Select Images"
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    withPreview={true}
                                    onChange={this.imageHandler.bind(this)}
                                    maxFileSize={5242880}
                                    withLabel={false}
                                />
                            </div>
                        </FormGroup> : null}
                        <FormGroup>
                            {this.state.cancelstatus ?
                                <div>
                                    <div style={{ float: "left" }}><img src={url + data.image} alt="" height="100" width="100" /></div>
                                    <div><img src={cancel} onClick={this.cancelimageHandler.bind(this)} alt="cancel" /></div>
                                </div>
                                : null}
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.updateConfirm.bind(this, data)}>Update</Button>{' '}
                    <Button color="secondary" onClick={this.toggleUpdateModal}>Cancel</Button>
                </ModalFooter>
            </div>
        )
    }

    updateConfirm = (data) => {

        var previmage = [];
        if (this.state.image && this.state.image.length) {
            previmage = this.state.image
        }
        else {
            previmage = data.image
        }
        let RegisterData = {
            name: this.state.name,
            email: this.state.email,
            countryId: parseInt(this.state.countryId),
            stateId: parseInt(this.state.stateId),
            salary: this.state.salary,
            image: previmage
        }
        if (RegisterData.name === '') {
            RegisterData.name = data.name
        }
        if (RegisterData.email === '') {
            RegisterData.email = data.email
        }
        if (RegisterData.countryId === 0) {
            RegisterData.countryId = data.countryId
        }
        if (RegisterData.stateId === 0) {
            RegisterData.stateId = data.stateId
        }
        if (RegisterData.salary === 0) {
            RegisterData.salary = data.salary
        }

        const formData = new FormData();
        formData.append('name', RegisterData.name);
        formData.append('email', RegisterData.email);
        formData.append('countryId', RegisterData.countryId);
        formData.append('stateId', RegisterData.stateId);
        formData.append('salary', RegisterData.salary);
        if (this.state.image && this.state.image.length) {
            formData.append('image', RegisterData.image[0]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        this.toggleUpdateModal();
        this.props.action.onUpdateData.updateRegister(data.regId, formData, config);
        this.setState({ cancelstatus: true })
    }

    renderUpdateConfirmationModal() {
        var data = ""
        if (this.props.getDataById) {
            data = this.props.getDataById.map(data => this.renderUpdateModal(data))
        }
        return (
            <Modal isOpen={this.state.updatemodal} toggle={this.toggleUpdateModal} className={this.props.className}>
                <ModalHeader toggle={this.toggleUpdateModal}>Update Details</ModalHeader>
                {data}
            </Modal>
        )
    }

    btnUpdate_Click(id) {
        this.props.action.onGetDataById.getDataById(id);
        this.setState({ updatemodal: !this.setState.updatemodal, updateId: id });
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

    render() {
        return (
            <div style={{ "width": "50%", "display": "inline" }}>
                <Button color="info" onClick={() => { this.btnUpdate_Click(this.props.regId) }}>Update</Button>
                {this.renderUpdateConfirmationModal()}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        country: state.country.country,
        state: state.state.state,
        getDataById: state.getregisterbyid.get_data_by_id
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        onGetCountry: bindActionCreators(countryAction, dispatch),
        onGetState: bindActionCreators(stateAction, dispatch),
        onGetDataById: bindActionCreators(getregisterAction, dispatch),
        onUpdateData: bindActionCreators(updateregisterAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateModal);
