import React, { Component } from 'react';

class Reservation extends Component {
    render() {
        return (
            <div>
                <h5>Nächste Reisen</h5>
                <div className="card mb-3 p-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Buchungs-Nr.</th>
                                <th scope="col">Hotelname</th>
                                <th scope="col">Ort</th>
                                <th scope="col">Land</th>
                                <th scope="col">Anreise-Datum</th>
                                <th scope="col">Abreise-Datum</th>
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
                                <a className="btn btn-primary mt-1" type="button" href="#">Details anzeigen</a>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h5>Vergangene Reisen</h5>
                <div className="card mb-3 p-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Buchungs-Nr.</th>
                                <th scope="col">Hotelname</th>
                                <th scope="col">Ort</th>
                                <th scope="col">Land</th>
                                <th scope="col">Anreise-Datum</th>
                                <th scope="col">Abreise-Datum</th>
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
                                <a className="btn btn-primary mt-1" type="button" href="#">Bewerten</a>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Reservation;