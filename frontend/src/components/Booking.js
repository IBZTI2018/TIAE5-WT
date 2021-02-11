import React, { Component } from "react";
import { withRouter } from "react-router";
import StarRating from "./offer/StarRating";
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

class Booking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      endDate: moment(),
      focus: null
    }

    if (!this.props.offer) {
      // TODO: load offer!
    }

    this.handleOnDatesChange = this.handleOnDatesChange.bind(this);
    this.handleOffer = this.handleOffer.bind(this);
    this.handleBooking = this.handleBooking.bind(this);
  }

  handleOnDatesChange = ({ startDate, endDate }) => {
    this.setState({startDate, endDate});
  }

  handleOffer(event) {
    this.props.history.push("/offers");
    event.preventDefault();
    return false;
  }

  handleBooking(event) {
    event.preventDefault();

    console.log(this.state)
    // TODO: Create booking here!
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
                Price: <b><u>CHF {this.props.offer.price}</u></b>
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

        <hr />

        <div className="row g-0">
          <div className="col-md-2">
            &nbsp;
          </div>
          <div className="col-md-10">
            <h5>Book a stay now</h5>

            Please chose the duration of your stay<br />
            <DateRangePicker 
                startDatePlaceholderText="From"
                startDate={this.state.startDate}
                startDateId="startDate"
                onDatesChange={this.handleOnDatesChange}
                endDatePlaceholderText="To"
                endDate={this.state.endDate}
                endDateId="endDate"
                minDate = {moment()}
                displayFormat="DD/MM/yyyy"
                focusedInput={this.state.focus}
                onFocusChange={focus => this.setState({ focus })}
            />
          </div>
        </div>

        <div>
          <button
            className="btn btn-primary float-right mb-2 mr-2"
            type="button"
            onClick={this.handleBooking}
          >
            Book Now!
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Booking);
