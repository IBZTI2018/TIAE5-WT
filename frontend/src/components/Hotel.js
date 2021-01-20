import React, { Component } from 'react';

class Hotel extends Component {
    render() {
        return (
            <div className="card mb-3 p-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="img-fluid rounded" src={this.props.data.image} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{this.props.data.title}</h5>
                            <p className="card-text">{this.props.data.description}</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            <a href="#" className="btn btn-primary">Hotel aufrufen</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Hotel;