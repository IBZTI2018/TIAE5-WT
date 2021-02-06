import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as authActions from '../../redux/auth/actions';
import * as titleActions from '../../redux/titles/actions';
import * as titleSelectors from '../../redux/titles/selectors';
import * as toast from '../../toast';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        const user = this.props.user || {};
        const title = user.title || {};

        this.state = {
            title: title.description,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: '',
            passwordRepeat: '',
            currentPassword: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { fetchTitles } = this.props;
        fetchTitles();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.missingValue(this.state.email)) return toast.error("E-Mail address must be valid")
        if (this.state.password != this.state.passwordRepeat) return toast.error("Passwords do not match")
        if (this.missingValue(this.state.currentPassword)) return toast.error("Current password must be provided")

        const { updateUserSelf } = this.props;
        updateUserSelf({
            password: this.state.password,
            currentPassword: this.state.currentPassword,
        })
        .then(() => {
            toast.success("Successfully updated account settings")
            this.setState({
                password: '',
                passwordRepeat: '',
                currentPassword: ''
            })
        })
        .catch((error) => {
            console.error(error)
            toast.error("Failed to update account settings")
        })
    }

    missingValue(str) {
        return str === undefined || str.length < 3;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                        </div>
                        <input 
                            value={this.state.title}
                            className="form-control"
                            type="text"
                            disabled
                        />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                        </div>
                        <input 
                            value={this.state.firstname}
                            name="firstname"
                            className="form-control"
                            placeholder="First name"
                            type="text"
                            disabled
                        />
                    </div>
                    
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                        </div>
                        <input 
                            value={this.state.lastname}
                            name="lastname"
                            className="form-control"
                            placeholder="Last name"
                            type="text"
                            disabled
                        />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                        </div>
                        <input 
                            value={this.state.email}
                            name="email"
                            className="form-control"
                            placeholder="E-Mail"
                            type="email"
                            disabled
                        />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                        </div>
                        <input 
                            value={this.state.password}
                            onChange={this.handleChange}
                            name="password"
                            className="form-control"
                            placeholder="New Password"
                            type="password"
                        />
                        <input 
                            value={this.state.passwordRepeat}
                            onChange={this.handleChange}
                            name="passwordRepeat"
                            className="form-control"
                            placeholder="Repeat New Password"
                            type="password"
                        />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                        </div>
                        <input 
                            value={this.state.currentPassword}
                            onChange={this.handleChange}
                            name="currentPassword"
                            className="form-control"
                            placeholder="Current Password"
                            type="password"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Update Account</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapSelectors = (store) => ({
  titles: titleSelectors.getTitles(store)
});

const mapActions = { ...authActions, ...titleActions }

export default connect(mapSelectors, mapActions)(withRouter(RegisterForm));
