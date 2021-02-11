import React, { Component } from "react";
import api from "../../redux/api";

class HotelroomCard extends Component {
  constructor(props) {
    super(props);
    this.hotelroom = props.hotelroom;
    this.deleteHotelroom = this.deleteHotelroom.bind(this);
  }

  deleteHotelroom(event) {
    let fakeHotelroom = api.create("hotelrooms");
    fakeHotelroom._base.id = this.hotelroom.id;
    fakeHotelroom.delete(() => {
      alert("Deleted");
    });
    event.preventDefault();
    return false;
  }

  render() {
    return (
      <div className="mb-5">
        <div className="card">
          <div class="card-header">
            Room number: #{this.hotelroom.roomnumber}
            <a
              href="#"
              class="btn btn-danger btn-sm ml-4"
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

export default HotelroomCard;
