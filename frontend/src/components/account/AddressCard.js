import { type } from "jquery";
import React, { Component } from "react";

class AddressCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.addressName,
      streetname: '',
      housenumber: '',
      cityname: '',
      postcode: '',
      country: '',
    }
  }

  render() {
    const user = this.props.user || {}
    let address = user[this.props.addressKey] || {}
    
    // Fallback for alternate address ("use same as")
    if (address.id === undefined) {
      address = user[this.props.addressKeyAlt] || {};
    }
    
    const street = address.street || {};
    const city = street.city || {};
    const country = city.country || {};


    this.state = {
      ...this.state,
      streetname: street.streetname,
      housenumber: address.housenumber,
      cityname: city.cityname,
      postcode: city.postcode,
      country: country.countryname,
    }

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.state.title}</h5>
          <p className="card-text">
            {this.state.streetname} {this.state.housenumber} <br />
            {this.state.postcode} {this.state.cityname} <br />
            {this.state.country}
          </p>
          <a href="#" className="btn btn-primary">Change</a>
        </div>
      </div>
    );
  }
}

export default AddressCard;
