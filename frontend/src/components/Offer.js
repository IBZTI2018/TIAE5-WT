import React, { Component } from 'react';

class Offer extends Component {
    render() {
        return (
            <div className="card mb-3 p-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="img-fluid rounded" src={this.props.offer.image} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{this.props.offer.title}</h5>
                            <p className="card-text">{this.props.offer.description}</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            <a href="#" class="btn btn-primary">Buchen</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Offer;