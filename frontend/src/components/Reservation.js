import React, { Component } from 'react';

class Reservation extends Component {
    render() {
        return (
            <div>
                <h5>Next trips</h5>
                <div className="card mb-3 p-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Booking-Nr.</th>
                                <th scope="col">Hotelname</th>
                                <th scope="col">City</th>
                                <th scope="col">Country</th>
                                <th scope="col">Arrival date</th>
                                <th scope="col">Departure date</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"></th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <a className="btn btn-primary mt-1" type="button" href="#">Show details</a>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h5>Past trips</h5>
                <div className="card mb-3 p-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Booking-Nr.</th>
                                <th scope="col">Hotelname</th>
                                <th scope="col">City</th>
                                <th scope="col">Country</th>
                                <th scope="col">Arrival date</th>
                                <th scope="col">Departure date</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1234</th>
                                <td>Hallo</td>
                                <td>Zürich</td>
                                <td>Sui</td>
                                <td>01.Okt.2021</td>
                                <td>10.Okt.2021</td>
                                <a className="btn btn-primary mt-1" type="button" href="#">Evaluate</a>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Reservation;