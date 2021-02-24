import React, { Component } from "react";
import { connect } from "react-redux";
import * as hotelroomsSelectors from "../../redux/hotelrooms/selectors";
import * as pricerangesSelectors from "../../redux/priceranges/selectors";
import * as roomequipmentsSelectors from "../../redux/roomequipments/selectors";
import * as hotelroomsActions from "../../redux/hotelrooms/actions";
import * as pricerangesActions from "../../redux/priceranges/actions";
import * as roomequipmentsActions from "../../redux/roomequipments/actions";
import * as toast from "../../toast";
import api from "../../redux/api";

class HotelroomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel_id: props.hotelId,
      roomname: "",
      roomnumber: 0,
      persons: 0,
      pricerange_id: 0,
      roomequipments: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Actions
    const { fetchPriceranges, fetchRoomequipments } = this.props;
    fetchPriceranges();
    fetchRoomequipments();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleMultipleChange = (event) => {
    this.setState({
      roomequipments: Array.from(
        event.target.selectedOptions,
        (item) => item.value
      ),
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    const { createHotelroom } = this.props;
    createHotelroom({ ...this.state })
      .then((hotelroom) => {
        for (let roomequipment of this.state.roomequipments) {
          let fakeObj = api.create("hotelroom_roomequipments");
          fakeObj.set("hotelroom_id", hotelroom._base.id);
          fakeObj.set("roomequipment_id", roomequipment);
          fakeObj.sync();
        }
        toast.success("Successfully created a new hotelroom!");
        
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to create a new hotelroom!");
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group input-group">
            <input
              value={this.state.roomname}
              onChange={this.handleChange}
              name="roomname"
              className="form-control"
              placeholder="Room name"
              type="text"
            />
            <input
              value={this.state.roomnumber}
              onChange={this.handleChange}
              name="roomnumber"
              className="form-control"
              placeholder="Room number"
              type="number"
            />
            <input
              value={this.state.persons}
              onChange={this.handleChange}
              name="persons"
              className="form-control"
              placeholder="Persons"
              type="number"
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Price range</label>
                <select
                  value={this.state.pricerange_id}
                  onChange={this.handleChange}
                  name="pricerange_id"
                  className="form-control"
                  placeholder="Price range"
                >
                  {this.props.priceranges.map((pricerange) => (
                    <option value={pricerange.id}>
                      {pricerange.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Room equipment</label>
                <select
                  value={this.state.roomequipments}
                  onChange={this.handleMultipleChange}
                  name="roomequipments"
                  className="form-control"
                  placeholder="Room equipment"
                  multiple
                >
                  {this.props.roomequipments.map((roomequipment) => (
                    <option value={roomequipment.id}>
                      {roomequipment.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <input type="hidden" name="hotel_id" value={this.state.hotel_id} />
            <button type="submit" className="btn btn-primary btn-block">
              Create hotel room
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapSelectors = (store) => ({
  priceranges: pricerangesSelectors.getPriceranges(store),
  roomequipments: roomequipmentsSelectors.getRoomequipments(store),
});

export default connect(mapSelectors, {
  ...hotelroomsActions,
  ...pricerangesActions,
  ...roomequipmentsActions,
})(HotelroomForm);
