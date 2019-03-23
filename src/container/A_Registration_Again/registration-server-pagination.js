import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Input, FormGroup } from 'reactstrap';

import * as getregisterAction from '../../action/getRegisterData';
import * as getByLimitAction from '../../action/getDataByLimit';
import { baseUrl } from '../../path';
import DeleteModal from '../delete-modal/delete-modal';
import UpdateModal from '../update-modal/update-modal';
import AddModal from '../add-modal/add-modal';

const url = baseUrl + "/";

class Registration extends Component {

    state = {
        limit: 2,
        page: 1
    }

    componentDidMount() {
        this.props.action.onGetByLimit.getDataByLimit(this.state.limit, this.state.page);
    }

    limitChangeHandler(e) {
        if (e.target.value === "all") {
            this.props.action.onGetByLimit.getDataByLimit(this.props.count, 1);
        }
        else {
            this.setState({ limit: e.target.value });
            this.props.action.onGetByLimit.getDataByLimit(e.target.value, this.state.page);
        }
    }

    buttonHandler(page) {
        this.setState({ page: page });
        this.props.action.onGetByLimit.getDataByLimit(this.state.limit, page);
    }
    
    prevbtnHandler() {
        if (this.state.page) {
            if (this.state.page !== 1) {
                var page = this.state.page - 1;
                this.props.action.onGetByLimit.getDataByLimit(this.state.limit, page);
                this.setState({ page: page })
            }
            else {
                this.props.action.onGetByLimit.getDataByLimit(this.state.limit, 1);
            }
        }
    }

    render() {
        let i;
        var button = [];
        if (this.props.pages) {
            button.push(<Button key="prev" onClick={this.prevbtnHandler.bind(this)}>Prev</Button>);
            for (i = 1; i <= this.props.pages; i++) {
                button.push(<Button key={i} onClick={this.buttonHandler.bind(this, i)}>{i}</Button>);
            }
            button.push(<Button key="next">Next</Button>);
        }
        else {
            button.push(<Button key="0">{0}</Button>);
        }

        function imageFormatter(cell) {
            return "<img src=" + url + cell + " height=50 width=50 />";
        }

        function ActionbuttonDisplay(cell) {
            return (
                <div style={{ "width": "100%", "display": "inline" }}>
                    <DeleteModal regId={cell} />{' '}
                    <UpdateModal regId={cell} />
                </div>);
        }

        function salaryFormatter(cell) {
            return "$" + cell;
        }
        return (
            <Container>
                <h3>Registration With Server side Pagination</h3>
                <hr />
                {button}
                <FormGroup style={{ "float": "right" }}>
                    <Input type="select" name="limit" id="limit" style={{ width: 80 }} onChange={this.limitChangeHandler.bind(this)}>
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="all">All</option>
                    </Input>
                </FormGroup>
                <AddModal />
                <hr />
                <BootstrapTable data={this.props.data} striped hover>
                    <TableHeaderColumn isKey dataField='image' dataFormat={imageFormatter}>Profile Image</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort={true}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='email' dataSort={true}>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='countryName' dataSort={true}>Country</TableHeaderColumn>
                    <TableHeaderColumn dataField='stateName' dataSort={true}>State</TableHeaderColumn>
                    <TableHeaderColumn dataField='salary' dataSort={true} dataFormat={salaryFormatter}>Salary</TableHeaderColumn>
                    <TableHeaderColumn dataField='regId' dataFormat={ActionbuttonDisplay}>Action</TableHeaderColumn>
                </BootstrapTable>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.getregister.data,
        pages: state.getregister.pages,
        count: state.getregister.count
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        onGetData: bindActionCreators(getregisterAction, dispatch),
        onGetByLimit: bindActionCreators(getByLimitAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration);