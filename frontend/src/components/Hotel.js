import React, { Component } from 'react';
import { withRouter } from 'react-router';
import StarRating from './offer/StarRating';

class Hotel extends Component {

    constructor(props) {
        super(props);
        this.handlehotelrooms = this.handlehotelrooms.bind(this);
        this.handlehotelequipment = this.handlehotelequipment.bind(this);
    }

    handlehotelrooms(event) {
        this.props.history.push({
            pathname: '/hotelrooms',
            state: {
                hotels: this.props.hotels
            }
        })
        event.preventDefault();
        return false;
    }

    handlehotelequipment(event) {
        this.props.history.push({
            pathname: '/hotelequipments',
            state: {
                hotels: this.props.hotels
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
                        <img className="img-fluid rounded" src={this.props.hotels.image} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                {this.props.hotels.hotelname}
                                <StarRating data={this.props.hotels.rating} />
                            </h5>
                            
                            <p className="card-text">{this.props.hotels.hotelequipment}...Hotelequipment how to show here ?or just any description from hotel ?</p>
                            <p className="card-text">{this.props.hotels.staff}...Hotelstaff how to show here ?</p>
                            <p className="card-text">{this.props.hotels.rating}...STARS -- Hotelrating how to show up on StarRating Component, rating is wrong ?</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago  and Start arent right assigned...</small></p>
                            <a onClick={this.handlehotelrooms} className="btn btn-primary">Show Hotel Rooms</a> <br></br> <br></br>
                            <a onClick={this.handlehotelequipment} className="btn btn-primary">Show Hotelequipment</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Hotel);