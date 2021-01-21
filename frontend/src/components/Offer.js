import React, { Component } from 'react';
import StarRating from './offer/StarRating';

import moment from 'moment';

class Offer extends Component {
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
                                {this.props.data.title}
                                <StarRating stars={this.props.data.stars} />
                            </h5>
                            <p className="card-text small">{this.props.data.description}</p>
                            <p className="card-text">
                                <small className="text-muted">
                                    Angebot gültig bis: <b>{moment.unix(this.props.data.validityend).format("DD.MM.YYYY")}</b>
                                </small>
                            </p>
                            <a href="#" className="btn btn-primary">
                                <b>CHF {this.props.data.price}</b>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Offer;