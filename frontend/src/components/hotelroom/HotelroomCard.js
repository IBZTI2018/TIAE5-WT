import React, { Component } from "react";
import api from "../../redux/api";
import { connect } from "react-redux";
import * as actions from "../../redux/hotels/actions";
import * as toast from '../../toast';

class HotelroomCard extends Component {
  constructor(props) {
    super(props);
    this.hotelroom = props.hotelroom;
    this.deleteHotelroom = this.deleteHotelroom.bind(this);
  }

  deleteHotelroom(event) {
    const { fetchHotels } = this.props;
    let fakeHotelroom = api.create("hotelrooms");
    fakeHotelroom._base.id = this.hotelroom.id;
    fakeHotelroom.delete(() => { 
      toast.success('The hotelroom was successfully deleted. Fetching list again.');
      fetchHotels();
    });
    event.preventDefault();
    return false;
  }

  render() {
    return (
      <div className="mb-5">
        <div className="card">
          <div className="card-header">
            Room number: #{this.hotelroom.roomnumber}
            <a
              href="#"
              className="btn btn-danger btn-sm ml-4"
              onClick={this.deleteHotelroom}
            >
              Delete Hotelroom
            </a>
          </div>
          <div className="card-body">
            <h5 className="card-title">Room name: {this.hotelroom.roomname}</h5>
            <p className="card-text">
              This room is for {this.hotelroom.persons} Person(s)
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapSelectors = (store) => ({})

export default connect(mapSelectors, { ...actions })(HotelroomCard);
