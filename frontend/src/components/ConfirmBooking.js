import React, { Component } from 'react';
import { withRouter } from 'react-router';
import StarRating from "./offer/StarRating";



class ConfirmBooking extends Component {

    constructor(props) {
        super(props);
        

        this.state = {
            focus: null
        }
        if(!this.props.offer){
        
        }

        this.handleOffer = this.handleOffer.bind(this);
        this.handleConfirmbooking = this.handleConfirmbooking.bind(this);
        this.handleBooking = this.handleBooking.bind(this);

    }

    handleOffer(event) {
        this.props.history.push("/offers");
        event.preventDefault();
        return false;
    }
    
    handleBooking(event) {
        this.props.handleBooking;
        return false;
    }

    handleConfirmbooking(event) {
          event.preventDefault(); 
    }

    render() {
        return (
            <div className="card mb-6 p-6">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="img-fluid rounded" 
                        src={this.props.offer.hotelroom.hotel.image}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                {this.props.offer.hotelroom.hotel.hotelname}
                                <StarRating hotel={this.props.offer.hotelroom.hotel}/>
                            </h5>
                            <hr />
                            <p className="card-text small">
                                Location: {" "}
                                {this.props.offer.hotelroom.hotel.address.street.city.cityname},{" "}
                                {
                                this.props.offer.hotelroom.hotel.address.street.city.country
                                    .countryname
                                } 
                            </p>
                            <p className="card-text small">Roomname: </p>
                            <p className="card-text small">Offer valid until: <b>{this.props.offer.validityend}</b></p>
                            <hr />
                            <p className="card-text">Arrival date:</p>
                            <p className="card-text">Departure date:</p>
                            <hr />
                            <p className="card-text"> <b>Price Total: CHF {this.props.offer.price} </b></p>
                            <hr />
                            <p className="card-text">Save confirmation as:</p>
                            <button className="btn btn-primary">PDF</button>
                            <button className="btn btn-primary ml-2">E-Mail</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(ConfirmBooking);