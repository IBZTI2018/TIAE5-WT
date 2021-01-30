import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Booking extends Component {

    constructor(props) {
        super(props);
            this.handleOffer = this.handleOffer.bind(this);
    }

    handleOffer(event) {
        this.props.history.push('/offers');
        event.preventDefault();
        return false;
    }

    render() {
        return (
            <div className="card mb-6 p-6">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="img-fluid rounded" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                Hallo Hotel
                            </h5>
                            <hr />
                            <p className="card-text small">Roomname: </p>
                            <p className="card-text small">Offer valid until: </p>
                            <p className="card-text">Hotel Description: </p>
                            <hr />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Hotelequipment</th>
                                        <th scope="col">Roomequipment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <a onClick={this.handleOffer} href="#">
                        ...Back to Offers
                </a>
                <div>
                    <button className="btn btn-primary float-right mb-2 mr-1" type="button" onClick="#Modal">
                    make booking
                    </button>
                </div>
            </div> 
        );
    }
}

export default withRouter(Booking);
