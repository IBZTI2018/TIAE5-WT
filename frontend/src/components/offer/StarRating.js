import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";

export default class StarRating extends Component {
  averageRating(ratings) {
    let avg = 0;
    if (ratings.length > 0) {
      ratings = ratings.map((rating) => rating.score);
      const sum = ratings.reduce((a, b) => a + b, 0);
      avg = sum / ratings.length;
    }
    return avg;
  }

  getStars() {
    if (this.props.hotel) {
      return this.averageRating(this.props.hotel.ratings);
    }
    return this.props.stars;
  }
  render() {
    return (
      <div className="StarRating">
        {this.props.feedback && (
          <ReactStars
            count={this.getStars()}
            onChange={this.props.feedback}
            size={20}
            color="grey"
            activeColor="#ef5350"
            char="❤"
          />
        )}
        {!this.props.feedback && (
          <ReactStars
            count={this.getStars()}
            size={16}
            color="#ef5350"
            activeColor="#ef5350"
            char="❤"
          />
        )}
      </div>
    );
  }
}
