import { type } from "jquery";
import React, { Component } from "react";

class AddressCard extends Component {
  constructor(props) {
    super(props);

    const user = this.props.user || {}
    let address = user[this.props.addressKey] || {}
    let usingFallbackAddress = false;

    // Fallback for alternate address ("use same as")
    if (address.id === undefined) {
      address = user[this.props.addressKeyAlt] || {};
      usingFallbackAddress = true;
    }
    
    const street = address.street || {};
    const city = street.city || {};
    const country = city.country || {};

    this.state = {
      title: props.addressName,
      streetname: street.streetname,
      housenumber: address.housenumber,
      cityname: city.cityname,
      postcode: city.postcode,
      country: country.countryname,
      usingFallbackAddress
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.state.title}</h5>
          { this.state.usingFallbackAddress &&
            <p className="card-text">
              <i>(Using Contact Address)</i>
            </p>
          }

          { !this.state.usingFallbackAddress &&
            <p className="card-text">
              {this.state.streetname} {this.state.housenumber} <br />
              {this.state.postcode} {this.state.cityname} <br />
              {this.state.country}
            </p>
          }
          <a href={`/user/address/${this.props.addressKey}`} className="btn btn-primary">Change</a>
        </div>
      </div>
    );
  }
}

export default AddressCard;
