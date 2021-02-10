import React, { Component } from "react";
import { withRouter } from "react-router";
import StarRating from "./offer/StarRating";

class Offer extends Component {
  constructor(props) {
    super(props);
    this.handleBooking = this.handleBooking.bind(this);
  }

  handleBooking(event) {
    this.props.history.push({
      pathname: "/booking",
      state: {
        offer: this.props.offer,
      },
    });
    event.preventDefault();
    return false;
  }

  averageRating(ratings) {
    let avg = 0;
    if (ratings.length > 0) {
      ratings = ratings.map((rating) => rating.score);
      const sum = ratings.reduce((a, b) => a + b, 0);
      avg = sum / ratings.length;
    }
    return avg;
  }

  render() {
    return (
      <div className="card mb-3 p-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              className="img-fluid rounded"
              src={this.props.offer.hotelroom.hotel.image}
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {this.props.offer.hotelroom.hotel.hotelname}
                <StarRating hotel={this.props.offer.hotelroom.hotel} />
              </h5>
              <p className="card-text small">
                <p className="card-text small">
                  Location:{" "}
                  {
                    this.props.offer.hotelroom.hotel.address.street.city
                      .cityname
                  }
                  ,{" "}
                  {
                    this.props.offer.hotelroom.hotel.address.street.city.country
                      .countryname
                  }
                </p>
              </p>
              <p className="card-text">
                <small className="text-muted">
                  Offer valid from: <b>{this.props.offer.validitystart}</b>
                  <br/>
                  Offer valid until: <b>{this.props.offer.validityend}</b>
                </small>
              </p>
              <p className="card-text">
                <small className="text-muted">  
                  Room for: 
                  <b className="ml-1">
                      {this.props.offer.hotelroom.persons}
                      {this.props.offer.hotelroom.persons == 1? (
                          <label className="ml-1">Person</label>
                      ): (
                          <label className="ml-1">Persons</label>
                      )}
                  </b>
                </small>
              </p>
              <a onClick={this.handleBooking} className="btn btn-primary">
                <b>CHF {this.props.offer.price}</b>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Offer);
