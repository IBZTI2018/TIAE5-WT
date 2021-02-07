import React, { Component } from 'react';
import HotelroomForm from '../components/hotelroom/HotelroomForm';
import { Switch, Route } from "react-router-dom";

class HotelroomsPage extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <Switch>
        <Route path={`${this.props.match.path}/create`}>
          <h2 className="mt-4 mb-4">Create a new hotel room</h2>
          <HotelroomForm hotelId={this.props.match.params.id}/>
        </Route>
      </Switch>
    );
  }
}

export default HotelroomsPage