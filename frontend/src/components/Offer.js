import React, { Component } from 'react';
import StarRating from './offer/StarRating';

class Offer extends Component {
    render() {
        return (
            <div className="card mb-3 p-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="img-fluid rounded" src={this.props.offer.image} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                {this.props.offer.hotelroom.hotel.hotelname}
                                <StarRating stars={this.props.offer.stars} />
                            </h5>
                            <p className="card-text small">
                                {this.props.offer.hotelroom.hotel.address.street.city.cityname}
                            </p>
                            <p className="card-text">
                                <small className="text-muted">
                                    Angebot gültig bis: <b>{this.props.offer.validityend}</b>
                                </small>
                            </p>
                            <a href="#" className="btn btn-primary">
                                <b>CHF {this.props.offer.price}</b>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Offer;