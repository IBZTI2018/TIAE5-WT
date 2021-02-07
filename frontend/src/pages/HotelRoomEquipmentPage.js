import React, { Component } from 'react';
import HotelRoomEquipment from '../components/HotelRoomEquipment';
import { connect } from "react-redux";
import * as authSelectors from "../redux/auth/selectors";
import * as equipmentSelectors from "../redux/hotelroomequipments/selectors";
import * as actions from "../redux/hotelroomequipments/actions";

class HotelRoomEquipmentPage extends Component {
    componentDidMount(props) {
        const { fetchHotelRoomEquipment } = this.props;
        
        // Alternativ
        // const fetchHotels = this.props.fetchHotels;

        // Check if user is logged in?
        // if (!this.props.isLoggedIn) { ...}

        fetchHotelRoomEquipment();
    }

    render() {
        return (
            <div>
                <h2>HotelRoomequipment list: </h2>
                <div className="row">
                    <div className="col-md-12">
                        {
                            this.props.hotelroomequipments.map(hotelroomequipments => (
                                <HotelRoomEquipment data={hotelroomequipments} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapSelectors = (store) => ({
    hotelroomequipments: equipmentSelectors.getHotelRoomEquipment(store),
    isLoggedIn: authSelectors.isLoggedIn(store)
});

const mapActions = { ...actions };

export default connect(mapSelectors, mapActions)(HotelRoomEquipmentPage);