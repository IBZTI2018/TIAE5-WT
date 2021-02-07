import React, { Component } from 'react';
import { withRouter } from 'react-router';
import StarRating from './offer/StarRating';

class HotelRoomEquipment extends Component {

    constructor(props) {
        super(props);
            this.handleHotelRoomEquipment = this.handleHotelRoomEquipment.bind(this);
    }

    handleHotelRoomEquipment(event) {
        this.props.history.push({
            pathname: '/#',
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
                                {this.props.data.hotelroomequipments}
                                <StarRating stars={this.props.data.stars} />
                            </h5>
                            <p className="card-text">{this.props.data.description}...Description</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            <a onClick={this.handleHotelRoomEquipment} className="btn btn-primary">Equipment Details</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(HotelRoomEquipment);