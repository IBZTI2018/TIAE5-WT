import React, { Component } from 'react';
import { withRouter } from 'react-router';
import StarRating from './offer/StarRating';

class HotelRoom extends Component {

    constructor(props) {
        super(props);
            this.handleHotelRooms = this.handleHotelRooms.bind(this);
    }

    handleHotelRooms(event) {
        this.props.history.push({
            pathname: '/hotelequipments',
            state: {
                data: this.props.data
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
                        <img className="img-fluid rounded" src={this.props.data.image} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                {this.props.data.roomname}
                                <StarRating stars={this.props.data.stars} />
                            </h5>
                            <p className="card-text">{this.props.data.roomequipments}...Equipment</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            <a onClick={this.handleHotelRooms} className="btn btn-primary">Equipment overview</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(HotelRoom);