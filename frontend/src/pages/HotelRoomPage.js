import React, { Component } from 'react';
import HotelRoom from '../components/HotelRoom';
import { connect } from "react-redux";
import * as authSelectors from "../redux/auth/selectors";
import * as roomSelectors from "../redux/rooms/selectors";
import * as actions from "../redux/rooms/actions";

class HotelRoomPage extends Component {

    componentDidMount(props) {
        if (this.props.isManager) {
            const { fetchRooms } = this.props;

            // Alternativ
            // const fetchRooms = this.props.fetchRooms;

            fetchRooms();
        }
        else //if not an Manager of any Hotel go to Root
        {
            this.props.history.push({
                pathname: "/",
              });
        }

    }

    render() {
        return (
            <div>
                <h2>Room list: </h2>
                <div className="row">
                    <div className="col-md-12">
                        {
                            this.props.hotelrooms.map(hotelrooms => (
                                <HotelRoom hotelrooms={hotelrooms} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapSelectors = (store) => ({
    hotelrooms: roomSelectors.getHotelRooms(store),
    isLoggedIn: authSelectors.isLoggedIn(store),
    isManager: authSelectors.isManager(store)
});

const mapActions = { ...actions };

export default connect(mapSelectors, mapActions)(HotelRoomPage);