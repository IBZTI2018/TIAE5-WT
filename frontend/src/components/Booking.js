import React, { Component } from "react";
import { withRouter } from "react-router";
import StarRating from "./offer/StarRating";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.handleOffer = this.handleOffer.bind(this);
  }

  handleOffer(event) {
    this.props.history.push("/offers");
    event.preventDefault();
    return false;
  }

  

  render() {
    return (
      <div className="card mb-6 p-6">
        <div className="row g-0">
          <div className="col-md-4">
            <div className="mb-4">
              <img
                className="img-fluid rounded"
                src={this.props.offer.hotelroom.hotel.image}
              />
            </div>
            <a onClick={this.handleOffer} href="#">
              &larr; Back to Offers
            </a>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {this.props.offer.hotelroom.hotel.hotelname}
                <StarRating hotel={this.props.offer.hotelroom.hotel} />
              </h5>
              <p>
                {this.props.offer.hotelroom.hotel.description}
              </p>
              <hr />
              <p className="card-text small">
                Location:{" "}
                {this.props.offer.hotelroom.hotel.address.street.city.cityname},{" "}
                {
                  this.props.offer.hotelroom.hotel.address.street.city.country
                    .countryname
                }
              </p>
              <p className="card-text small">
                Offer valid until: <b>{this.props.offer.validityend}</b>
              </p>
              <p className="card-text small">
                Price: <b>CHF {this.props.offer.price}</b>
              </p>
              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Hotelequipment</th>
                    <th scope="col">Roomequipment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary float-right mb-2 mr-2"
            type="button"
            onClick="#Modal"
          >
            Book Now!
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Booking);
