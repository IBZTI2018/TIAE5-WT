import React, { Component } from 'react';
import { withRouter } from 'react-router';
import StarRating from './offer/StarRating';

import React, { Component } from 'react';

class EditOffers extends Component {

    constructor(props) {
        super(props);
            this.handleBooking = this.handleBooking.bind(this);
    }

    handleOffers(event) {
        this.props.history.push({
            pathname: '/booking',
            state: {
                EditOffers: this.props.EditOffers
            }
        })
        event.preventDefault();
        return false;
    }



    render() {
        return (
            <div className="card mb-3 p-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="img-fluid rounded" src={this.props.EditOffers.hotelroom.hotel.image} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                {this.props.EditOffers.hotelroom.hotel.hotelname}
                                <StarRating stars={this.props.EditOffers.stars} />
                            </h5>
                            <p className="card-text small">
                                <p className="card-text small">Location: {this.props.EditOffers.hotelroom.hotel.address.street.city.cityname}, {this.props.EditOffers.hotelroom.hotel.address.street.city.country.countryname}</p>
                            </p>
                            <p className="card-text">
                                <small className="text-muted">
                                Offer valid until: <b>{this.props.EditOffers.validityend}</b>
                                </small>
                            </p>
                            <a onClick={this.handleOffers} className="btn btn-primary">
                                <b>CHF {this.props.EditOffers.price}</b>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditOffers);