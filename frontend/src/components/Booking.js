import React, { Component } from 'react';
import { withRouter } from 'react-router';
import StarRating from './offer/StarRating';


class Booking extends Component {

    constructor(props) {
        super(props);
            this.handleOffer = this.handleOffer.bind(this);
    }

    handleOffer(event) {
        this.props.history.push('/offers');
        event.preventDefault();
        return false;
    }

    render() {
        return (
            <div className="card mb-6 p-6">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="img-fluid rounded" src={this.props.offer.hotelroom.hotel.image} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                {this.props.offer.hotelroom.hotel.hotelname}
                                <StarRating stars={this.props.offer.stars} />
                            </h5>
                            <hr />
                            <p className="card-text small">Location: {this.props.offer.hotelroom.hotel.address.street.city.cityname}, {this.props.offer.hotelroom.hotel.address.street.city.country.countryname}</p>
                            <p className="card-text small">Offer valid until: <b>{this.props.offer.validityend}</b></p>
                            <p className="card-text small">Price: <b>CHF {this.props.offer.price}</b></p>
                            <hr />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Hotelequipment</th>
                                        <th scope="col">Roomequipment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <a onClick={this.handleOffer} href="#">
                        ...Back to Offers
                </a>
                <div>
                    <button className="btn btn-primary float-right mb-2 mr-1" type="button" onClick="#Modal">
                    make booking
                    </button>
                </div>
            </div> 
        );
    }
}

export default withRouter(Booking);
