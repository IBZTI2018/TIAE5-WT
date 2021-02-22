import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class Hotel extends Component {
    render() {
        let unpublishedRatings = this.props.data.ratings.filter((rating) => rating.published == false);
        return (
            <div className="card mb-3 p-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="img-fluid rounded" src={this.props.data.image} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{this.props.data.hotelname}</h5>
                            <p className="card-text">{this.props.data.description}</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            { unpublishedRatings.length > 0 &&
                              (
                                <Link to={'/hotels/' + this.props.data.id + '/review_ratings'}  className="btn btn-danger">
                                  <span class="badge badge-light">{unpublishedRatings.length}</span> Pending ratings
                                </Link>
                              )
                            }
                            <Link to={'/hotels/' + this.props.data.id}  className="btn btn-primary ml-2">Hotel overview</Link>
                            <Link to={'/hotels/' + this.props.data.id + '/hotelrooms'} className="btn btn-dark ml-2">View Hotel rooms</Link>
                            <Link to={'/hotels/' + this.props.data.id + '/hotelrooms/create'} className="btn btn-warning ml-2">Create Hotel room</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Hotel);