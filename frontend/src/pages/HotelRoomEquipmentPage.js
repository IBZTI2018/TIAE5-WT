import React, { Component } from 'react';
import HotelRoomEquipment from '../components/HotelRoomEquipment';
import { connect } from "react-redux";
import * as authSelectors from "../redux/auth/selectors";
import * as equipmentSelectors from "../redux/equipments/selectors";
import * as actions from "../redux/equipments/actions";

class HotelRoomEquipmentPage extends Component {
    componentDidMount(props) {
        const { fetchRoomEquipment } = this.props;
        
        // Alternativ
        // const fetchHotels = this.props.fetchHotels;

        // Check if user is logged in?
        // if (!this.props.isLoggedIn) { ...}

        fetchRoomEquipment();
    }

    render() {
        return (
            <div>
                <h2>Equipment list: </h2>
                <div className="row">
                    <div className="col-md-12">
                        {
                            this.props.hotelequipments.map(hotelequipments => (
                                <HotelRoomEquipment data={hotelequipments} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapSelectors = (store) => ({
    hotelequipments: equipmentSelectors.getRoomEquipment(store),
    isLoggedIn: authSelectors.isLoggedIn(store)
});

const mapActions = { ...actions };

export default connect(mapSelectors, mapActions)(HotelRoomEquipmentPage);