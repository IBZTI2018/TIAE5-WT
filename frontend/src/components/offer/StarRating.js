import React, { Component } from 'react'
import ReactStars from "react-rating-stars-component";

export default class StarRating extends Component {
    render() {
        return (
            <div className="StarRating">
                {
                    this.props.feedback && (
                        <ReactStars
                            count={this.props.stars}
                            onChange={this.props.feedback}
                            size={20}
                            color="grey"
                            activeColor="#ffd700"
                        />
                    )
                }
                {
                    !this.props.feedback && (
                        <ReactStars
                            count={this.props.stars}
                            size={16}
                            color="#ffd700"
                            activeColor="#ffd700"
                        />
                    )
                }
            </div>
        )
    }
}
