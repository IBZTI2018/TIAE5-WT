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
                            <p className="card-text small">Roomname: </p>
                            <p className="card-text">
                                <small className="text-muted">
                                    Offer valid until: <b></b>
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
                <a onClick={this.handleOffer} className="">
                        ...Back to Offers
                </a>
            </div>
        );
    }
}

export default withRouter(Booking);