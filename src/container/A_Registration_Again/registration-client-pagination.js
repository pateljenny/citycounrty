import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import _ from 'lodash';
import * as getregisterAction from '../../action/getRegisterData';
import { baseUrl } from '../../path';
import DeleteModal from '../delete-modal/delete-modal';
import UpdateModal from '../update-modal/update-modal';
import AddModal from '../add-modal/add-modal';

const url = baseUrl + "/";

class Registration extends Component {
    componentDidMount() {
        this.props.action.onGetData.getRegisterData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (_.isEqual(this.props.data, prevProps.data)) {
            this.props.action.onGetData.getRegisterData();
        }
        else {
        }
    }

    render() {
        const options = {
            page: 1,
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.props.data.length
            }],
            sizePerPage: 5,
            pageStartIndex: 0,
            paginationSize: 3,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            paginationPosition: 'top',
            withFirstAndLast: false,
        };

        function imageFormatter(cell) {
            return "<img src=" + url + cell + "  height=50 width=50 />";
        }

        function DeletebuttonDisplay(cell) {
            return (
                <div>
                    <DeleteModal regId={cell} />{' '}
                    <UpdateModal regId={cell} />
                </div>);
        }

        function salaryFormatter(cell) {
            return "$" + cell;
        }
        return (
            <Container>
                <h3>Registration Page with Client side Pagination</h3>
                <hr />
                <AddModal />
                <BootstrapTable data={this.props.data} pagination={true} options={options} striped hover>
                    <TableHeaderColumn isKey dataField='image' dataFormat={imageFormatter}>Profile Image</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort={true}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='email' dataSort={true}>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='countryName' dataSort={true}>Country</TableHeaderColumn>
                    <TableHeaderColumn dataField='stateName' dataSort={true}>State</TableHeaderColumn>
                    <TableHeaderColumn dataField='salary' dataSort={true} dataFormat={salaryFormatter}>Salary</TableHeaderColumn>
                    <TableHeaderColumn dataField='regId' dataFormat={DeletebuttonDisplay}>Action</TableHeaderColumn>
                </BootstrapTable>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.getregister.data
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        onGetData: bindActionCreators(getregisterAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration);