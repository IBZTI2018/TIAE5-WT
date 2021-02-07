import React, { Component } from 'react';
import HotelEquipment from '../components/HotelEquipment';
import { connect } from "react-redux";
import * as authSelectors from "../redux/auth/selectors";
import * as equipmentSelectors from "../redux/hotelequipments/selectors";
import * as actions from "../redux/hotelequipments/actions";

class HotelEquipmentPage extends Component {
    componentDidMount(props) {
        const { fetchHotelEquipment } = this.props;
        
        // Alternativ
        // const fetchHotels = this.props.fetchHotels;

        // Check if user is logged in?
        // if (!this.props.isLoggedIn) { ...}

        fetchHotelEquipment();
    }

    render() {
        return (
            <div>
                <h2>Hotelequipment list: </h2>
                <div className="row">
                    <div className="col-md-12">
                        {
                            this.props.hotelequipments.map(hotelequipments => (
                                <HotelEquipment data={hotelequipments} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapSelectors = (store) => ({
    hotelequipments: equipmentSelectors.getHotelEquipment(store),
    isLoggedIn: authSelectors.isLoggedIn(store)
});

const mapActions = { ...actions };

export default connect(mapSelectors, mapActions)(HotelEquipmentPage);