import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";
import api from "../redux/api";
import { connect } from "react-redux";
import * as actions from "../redux/ratings/actions";
import * as toast from '../toast';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: props.review,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.state.review.published = true;
    this.setState({ review: this.state.review });
    let fakeRating = api.create("ratings");
    Object.keys(this.state.review).forEach((k) => fakeRating.set(k, this.state.review[k]));
    fakeRating._base.id = this.state.review.id;
    fakeRating.delete(() => { 
      toast.success('The comment was successfully published');
      const { id, reservation, ...rest } = this.state.review;
      this.props.createRating(rest, reservation.id);
    });
    e.preventDefault();
    return false;
  }

  render() {
    return (
      <div className="mb-4">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                {this.state.review.published && (
                  <span className="badge badge-success">Published</span>
                )}
                {!this.state.review.published && (
                  <span className="badge badge-warning">Review pending</span>
                )}
                <label className="mr-2">&nbsp;</label>
                {this.state.review.anonymous && (
                  <strong>Anonymous Guest</strong>
                )}
                {!this.state.review.anonymous && (
                  <strong>
                    {this.state.review.reservation.user && (
                      <strong>
                        {this.state.review.reservation.user.firstname}
                        {this.state.review.reservation.user.lastname}
                      </strong>
                    )}
                    {
                      // This is a workaround for the circular dependency resolving
                      // in the JSON-API library that scres up reviews by the same user
                      (!this.state.review.reservation.user ||
                        this.state.review.reservation.user == "[Circular]") && (
                        <strong>Another user</strong>
                      )
                    }
                  </strong>
                )}
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  <ReactStars
                    count={5}
                    value={this.state.review.score}
                    size={30}
                    color1="#ef5350"
                    char="❤"
                    edit={false}
                  />
                </h5>
                <p className="card-text">{this.state.review.comment}</p>
                {this.props.isManager && this.state.review.published == false && (
                  <a href="#" className="btn btn-success" onClick={this.handleClick}>
                    Publish comment
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapSelectors = (store) => ({})
export default connect(mapSelectors, { ...actions })(Review);
