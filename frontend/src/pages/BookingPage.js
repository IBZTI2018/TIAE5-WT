import Booking from '../components/Booking';

import React, { Component } from 'react';

class BookingPage extends Component {
    render() {
        let offer = undefined;
        if (this.props.location.state != undefined) {
            offer = this.props.location.state.offer
        }
        return (
            <div>
                <h1>Booking overview: </h1>
                {offer && (
                    <Booking offer={offer} />
                )}
                {!offer && (
                    <p>No offer was chosen</p>
                )}
            </div>
        );
    }
}

export default BookingPage;