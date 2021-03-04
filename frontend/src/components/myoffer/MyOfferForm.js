import React, { Component } from "react";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import { connect } from "react-redux";
import * as offerActions from "../../redux/offers/actions";
import * as toast from "../../toast";

class MyOfferForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel_id: undefined,
      hotelroom_id: undefined,
      price: 0,
      validitystart: moment(),
      validityend: moment().add(5, "days"),
      focus: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOnDatesChange = this.handleOnDatesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.state.hotel_id === undefined && this.props.hotels.length > 0) {
      this.setState({ hotel_id: this.props.hotels[0].id });
    }

    if (this.state.hotelroom_id === undefined && this.getHotelrooms().length > 0) {
      this.setState({ hotelroom_id: this.getHotelrooms()[0].id });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOnDatesChange = ({ startDate, endDate }) => {
    this.setState({ validitystart: startDate, validityend: endDate });
  };

  handleSubmit(event) {
    event.preventDefault();

    const { createOffer } = this.props;
    createOffer({ ...this.state })
      .then((offer) => toast.success("Successfully created a new offer!"))
      .catch((error) => {
        console.error(error);
        toast.error("Failed to create a new offer!");
      });
  }

  getHotelrooms() {
    for (let hotel of this.props.hotels) {
      if (hotel.id == this.state.hotel_id) {
        return hotel.hotelrooms;
      }
    }
    return [];
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="my-1 mr-2" for="inlineFormCustomSelectPref">
              Hotel
            </label>
            <select
              className="custom-select my-1 mr-sm-2"
              name="hotel_id"
              value={this.state.hotel_id}
              onChange={this.handleChange}
            >
              {this.props.hotels.map((hotel) => (
                <option value={hotel.id}>{hotel.hotelname}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="my-1 mr-2" for="inlineFormCustomSelectPref">
              Hotelroom
            </label>
            <select
              className="custom-select my-1 mr-sm-2"
              name="hotelroom_id"
              value={this.state.hotelroom_id}
              onChange={this.handleChange}
            >
              {this.getHotelrooms().map((hotelroom) => (
                <option value={hotelroom.id}>{hotelroom.roomname}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="my-1 mr-2" for="price">
              Price
            </label>
            <input
              className="form-control"
              name="price"
              type="number"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className="my-1 mr-2" for="price">
              Start- und Enddatum
            </label>
            <DateRangePicker
              startDatePlaceholderText="From"
              startDate={this.state.validitystart}
              startDateId="startDate"
              onDatesChange={this.handleOnDatesChange}
              endDatePlaceholderText="To"
              endDate={this.state.validityend}
              endDateId="endDate"
              minDate={moment()}
              displayFormat="DD/MM/yyyy"
              focusedInput={this.state.focus}
              onFocusChange={(focus) => this.setState({ focus })}
            />
          </div>

          <button type="submit" className="btn btn-primary my-1">
            Create offer
          </button>
        </form>
      </div>
    );
  }
}

const mapSelectors = (store) => ({});

export default connect(mapSelectors, { ...offerActions })(MyOfferForm);
