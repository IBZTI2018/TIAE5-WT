import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function mapStateToProps(state) {
    return {

    };
}

class ConfirmBooking extends Component {
    render() {
        return (
            <div className="card mb-6 p-6">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="img-fluid rounded" src="loading"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                Hotel Name:
                            </h5>
                            <hr />
                            <p className="card-text small">Location: </p>
                            <p className="card-text small">Roomname: </p>
                            <p className="card-text small">Offer valid until: <b></b></p>
                            <hr />
                            <p className="card-text">Arrival date:</p>
                            <p className="card-text">Departure date:</p>
                            <hr />
                            <p className="card-text"> <b>Price Total: CHF </b></p>
                            <hr />
                            <p className="card-text">Save confirmation as:</p>
                            <button className="btn btn-primary">PDF</button>
                            <button className="btn btn-primary ml-2">E-Mail</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ConfirmBooking);