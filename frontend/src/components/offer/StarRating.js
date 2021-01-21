import React, { Component } from 'react'
import ReactStars from "react-rating-stars-component";

export default class StarRating extends Component {
    render() {
        return (
            <div className="StarRating">
                <ReactStars
                    count={this.props.stars}
                    size={16}
                    color="#ffd700"
                    activeColor="#ffd700"
                />
            </div>
        )
    }
}
