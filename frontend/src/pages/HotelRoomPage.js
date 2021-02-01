import React, { Component } from 'react';
import HotelRoom from '../components/HotelRoom';
import { connect } from "react-redux";
import * as authSelectors from "../redux/auth/selectors";
import * as hotelroomsSelectors from "../redux/rooms/selectors";
import * as actions from "../redux/rooms/actions";

class HotelRoomPage extends Component {
    componentDidMount(props) {
        const { fetchRooms } = this.props;
        
        // Alternativ
        // const fetchHotels = this.props.fetchHotels;

        // Check if user is logged in?
        // if (!this.props.isLoggedIn) { ...}

        fetchRooms();
    }

    render() {
        return (
            <div>
                <h2>Room list: </h2>
                <div className="row">
                    <div className="col-md-12">
                        {
                            this.props.hotels.map(hotelroom => (
                                <HotelRoom data={hotelroom} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapSelectors = (store) => ({
    hotelroom: hotelroomSelectors.getHotelRooms(store),
    isLoggedIn: authSelectors.isLoggedIn(store)
});

const mapActions = { ...actions };

export default connect(mapSelectors, mapActions)(HotelRoomPage);