import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as deleteregisterAction from '../../action/deleteRegisterData';

class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deletemodal: false,
            activeId: ''
        };

        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.btnRemoveToggle = this.btnRemoveToggle.bind(this);
    }

    toggleDeleteModal() {
        this.setState({
            deletemodal: !this.state.deletemodal
        });
    }

    btnRemoveToggle(id) {
        this.setState({
            deletemodal: !this.state.deletemodal,
            activeId: id
        });
    }

    btnConfirm_Click = () => {
        this.toggleDeleteModal();
        this.props.action.onDeleteData.deleteRegister(this.state.activeId);
    }

    renderDeleteConfirmationModal = () => (
        <Modal isOpen={this.state.deletemodal} toggle={this.toggleDeleteModal} className={this.props.className}>
            <ModalHeader toggle={this.toggleDeleteModal}>Delete Confirmation</ModalHeader>
            <ModalBody>
                Are you sure you want to delete it??
                </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.btnConfirm_Click}>Yes</Button>{' '}
                <Button color="secondary" onClick={this.toggleDeleteModal}>No</Button>
            </ModalFooter>
        </Modal>
    );

    render() {
        return (
            <div style={{"width":"50%","display":"inline"}}>
                <Button color="danger" onClick={() => { this.btnRemoveToggle(this.props.regId) }}>Delete</Button>
                {this.renderDeleteConfirmationModal()}
            </div>
        );
    }
}



const mapDispatchToProps = dispatch => ({
    action: {
        onDeleteData: bindActionCreators(deleteregisterAction, dispatch),
    }
})

export default connect(null, mapDispatchToProps)(DeleteModal);