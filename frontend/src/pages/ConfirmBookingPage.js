import ConfirmBooking from '../components/ConfirmBooking';

import React, { Component } from 'react';

class ConfirmBookingPage extends Component {
    render(){
        let offer = undefined;
        if (this.props.location.state != undefined) {
            offer = this.props.location.state.offer
        }
        return (
            <div>
                <h1>Booking confirmation : </h1>
                {offer && (
                    <ConfirmBooking offer={offer} />
                )}
            </div>
        );
    }
}


export default ConfirmBookingPage;