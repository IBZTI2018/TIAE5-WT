import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as authActions from '../redux/auth/actions';
import * as titleActions from '../redux/titles/actions';
import * as titleSelectors from '../redux/titles/selectors';
import * as countryActions from '../redux/countries/actions';
import * as countrySelectors from '../redux/countries/selectors';
import * as toast from '../toast';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 1,
            firstname: '',
            lastname: '',
            email: '',
            streetname: '',
            housenumber: '',
            postcode: '',
            cityname: '',
            country: 1,
            password: '',
            passwordRepeat: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const { fetchTitles, fetchCountries } = this.props;
        fetchTitles();
        fetchCountries();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.password !== this.state.passwordRepeat) {
            toast.error("Registration failed, passwords do not match!");
            return;
        }

        const { createNewUser } = this.props;
        const payload = {
            email: this.state.email,
            password: this.state.password,
            cityname: this.state.cityname,
            postcode: this.state.postcode,
            streetname: this.state.streetname,
            housenumber: this.state.housenumber,
            country_id: this.state.country,
            title_id: this.state.title,
            firstname: this.state.firstname,
            lastname: this.state.lastname
        }
        
        createNewUser(payload)
            .then(() => {
                toast.success("Successfully registered, enjoy your holidays!");
                this.props.history.push({pathname: "/"});
            })
            .catch((error) => {
              console.error(error);
              toast.error("Registration failed, please check your inputs!");
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                        </div>
                        <select className="custom-select">
                            {
                                this.props.titles.map((title) => (
                                    <option value={title.id}>{title.description}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                        </div>
                        <input 
                            value={this.state.firstname}
                            onChange={this.handleChange}
                            name="firstname"
                            className="form-control"
                            placeholder="First name"
                            type="text"
                        />
                    </div>
                    
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                        </div>
                        <input 
                            value={this.state.lastname}
                            onChange={this.handleChange}
                            name="lastname"
                            className="form-control"
                            placeholder="Last name"
                            type="text"
                        />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                        </div>
                        <input 
                            value={this.state.email}
                            onChange={this.handleChange}
                            name="email"
                            className="form-control"
                            placeholder="E-Mail"
                            type="email"
                        />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-building"></i> </span>
                        </div>
                        <input 
                            value={this.state.streetname}
                            onChange={this.handleChange}
                            name="streetname"
                            className="form-control"
                            placeholder="Addresse"
                            type="text"
                        />

                        <input 
                            value={this.state.housenumber}
                            onChange={this.handleChange}
                            name="housenumber"
                            className="form-control"
                            placeholder="Nr."
                            type="number"
                        />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-building"></i> </span>
                        </div>
                        <input 
                            value={this.state.postcode}
                            onChange={this.handleChange}
                            name="postcode"
                            className="form-control"
                            placeholder="ZIP-Code"
                            type="number"
                        />
                        <input 
                            value={this.state.cityname}
                            onChange={this.handleChange}
                            name="cityname"
                            className="form-control"
                            placeholder="City"
                            type="text"
                        />
                        <select className="custom-select">
                            {
                                this.props.countries.map((country) => (
                                    <option value={country.id}>{country.countryname}</option>
                                ))
                            }
                        </select>
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
                            placeholder="Password"
                            type="text"
                        />
                        <input 
                            value={this.state.passwordRepeat}
                            onChange={this.handleChange}
                            name="passwordRepeat"
                            className="form-control"
                            placeholder="Repeat Password"
                            type="text"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Create Account</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapSelectors = (store) => ({
  titles: titleSelectors.getTitles(store),
  countries: countrySelectors.getCountries(store)
});

const mapActions = { ...authActions, ...titleActions, ...countryActions}

export default connect(mapSelectors, mapActions)(withRouter(RegisterForm));
