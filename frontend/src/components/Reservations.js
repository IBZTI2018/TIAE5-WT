import React, { Component } from 'react';
import ReservationRow from '../components/reservations/ReservationRow';

class Reservations extends Component {
    render() {
        return (
            <div>
                <h5>{this.props.title}</h5>
                <div className="card mb-3 p-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Booking-Nr.</th>
                                <th scope="col">Hotelname</th>
                                <th scope="vol">Roomname</th>
                                <th scope="col">Arrival date</th>
                                <th scope="col">Departure date</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.reservations.map((reservation) => (
                                    <ReservationRow reservation={reservation} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Reservations;