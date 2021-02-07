import React, { Component } from 'react';
import { withRouter } from 'react-router';
import StarRating from './offer/StarRating';

class HotelRoom extends Component {

    constructor(props) {
        super(props);
            this.handlehotelroomequipment = this.handlehotelroomequipment.bind(this);
            this.handleOffers = this.handleOffers.bind(this);
    }

    handlehotelroomequipment(event) {
        this.props.history.push({
            pathname: '/roomequipments',
            state: {
                hotelrooms: this.props.hotelrooms
            }
        })
        event.preventDefault();
        return false;
    }

    handleOffers(event) {
        this.props.history.push({
            pathname: '/roomoffers',
            state: {
                hotelrooms: this.props.hotelrooms
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
                        <img className="img-fluid rounded" src={this.props.hotelrooms.image} alt="How do i get the Image here?" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                {this.props.hotelrooms.roomname}
                                <StarRating stars={this.props.hotelrooms.stars} />
                            </h5>
                            <p className="card-text">{this.props.hotelrooms.roomequipments}...Equipments not loading ?</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            <a onClick={this.handlehotelroomequipment} className="btn btn-primary">Equipment overview</a><br></br><br></br>
                            <a onClick={this.handleOffers} className="btn btn-primary">Show offers</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(HotelRoom);