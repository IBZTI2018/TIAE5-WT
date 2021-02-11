import React, { Component } from "react";
import HotelroomCard from "../components/hotelroom/HotelroomCard";
import HotelroomForm from "../components/hotelroom/HotelroomForm";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as hotelSelectors from "../redux/hotels/selectors";
import * as hotelActions from "../redux/hotels/actions";

class HotelroomsPage extends Component {
  componentDidMount() {
    const { fetchHotels } = this.props;
    fetchHotels();
  }

  renderHotelrooms() {
    const { hotels } = this.props;
    let hotelrooms = [];

    console.log(hotels);

    for (let hotel of hotels) {
      if (hotel.id == this.props.match.params.id) {
        hotelrooms = hotel.hotelrooms;
      }
    }

    if (hotelrooms.length > 0) {
      return hotelrooms.map((hotelroom) => (
        <HotelroomCard hotelroom={hotelroom} />
      ));
    } else {
      return <p>There are currently no hotelrooms on this hotel</p>;
    }
  }

  render() {
    return (
      <Switch>
        <Route path={`${this.props.match.path}`}>{this.renderHotelrooms()}</Route>
        <Route path={`${this.props.match.path}/create`}>
          <h2 className="mt-4 mb-4">Create a new hotel room</h2>
          <HotelroomForm hotelId={this.props.match.params.id} />
        </Route>
      </Switch>
    );
  }
}

const mapSelectors = (store) => ({
  hotels: hotelSelectors.getHotels(store),
});

const mapActions = { ...hotelActions };

export default connect(mapSelectors, mapActions)(HotelroomsPage);
