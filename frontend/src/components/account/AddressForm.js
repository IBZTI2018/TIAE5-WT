import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as toast from '../../toast';

class AddressForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default connect(null, null)(AddressForm);
