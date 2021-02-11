import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";

class Review extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      review: props.review
    };
  }

  render() {
    return (
      <div>
      <div className="row">
        <div className="col-md-6">
          <div className="well well-sm">
            <div className="row" id="post-review-box">
              <div className="col-md-12 mb-4">
                <h5>
                { this.state.review.anonymous &&
                  <strong>Anonymous Guest</strong>
                }
                {
                  !this.state.review.anonymous &&
                  <strong>
                    {this.state.review.reservation.user.firstname} 
                    {this.state.review.reservation.user.lastname}
                  </strong>
                }
                </h5>
                <ReactStars
                  count={5}
                  value={this.state.review.score}
                  size={30}
                  color1="#ef5350"
                  char="❤"
                  edit={false}
                />
                <p>
                  {this.state.review.comment}
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;