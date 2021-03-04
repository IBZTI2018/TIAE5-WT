import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../redux/auth/actions';
import * as countryActions from '../../redux/countries/actions';
import * as countrySelectors from '../../redux/countries/selectors';
import * as toast from '../../toast';

class AddressForm extends Component {
    constructor(props) {
        super(props);

        const address = props.user[props.addressKey];

        if (address) {
            this.state = {
                streetname: address.street.streetname,
                housenumber: address.housenumber,
                postcode: address.street.city.postcode,
                cityname: address.street.city.cityname,
                country_id: address.street.city.country.id || 1 //[CIRCULAR]
            }
        } else {
            this.state = {
                streetname: '',
                housenumber: '',
                postcode: '',
                cityname: '',
                country_id: this.props.countries[0].id
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDiscard = this.handleDiscard.bind(this);
    }

    componentDidMount() {
        const { fetchCountries } = this.props;
        fetchCountries();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        const { updateUserAddress } = this.props;        
        updateUserAddress({ ...this.state, address_type: this.props.addressKey })
            .then(() => {
                toast.success('Successfully updated address!')
            })
            .catch((error) => {
                console.error(error)
                toast.error('Failed to update address!')
            })
    }

    handleDiscard(event) {
        event.preventDefault();
        window.location.replace('/user');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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
                                    <option value={country.id} selected={country.id == this.state.country_id}>{country.countryname}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="btn-group">
                        <button onClick={this.handleDiscard} type="discard" className="btn btn-danger">Discard</button>
                        <button type="submit" className="btn btn-primary">Update Address</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapSelectors = (store) => ({
    countries: countrySelectors.getCountries(store)
});
  
const mapActions = { ...authActions, ...countryActions}

export default connect(mapSelectors, mapActions)(AddressForm);
