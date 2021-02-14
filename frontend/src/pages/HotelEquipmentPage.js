import React, { Component } from 'react';
import Hotel from '../components/Hotel';
import HotelEquipment from '../components/HotelEquipment';
import { connect } from "react-redux";
import * as authSelectors from "../redux/auth/selectors";
import * as hotelSelectors from "../redux/hotels/selectors";
import * as hotelactions from "../redux/hotels/actions";
import * as equipmentSelectors from "../redux/hotelequipments/selectors";
import * as hotelequipmentactions from "../redux/hotelequipments/actions";

class HotelEquipmentPage extends Component {
    componentDidMount(props) {
        if(this.props.isManager){
            const { fetchHotels } = this.props;
            const { fetchHotelEquipment } = this.props;
        
        // Alternativ
        // const fetchHotels = this.props.fetchHotels;

        // Check if user is logged in?
        // if (!this.props.isLoggedIn) { ...}
            fetchHotels();
            fetchHotelEquipment();
        }
        else //if not an Manager of any Hotel go to Root
        {
            this.props.history.push({
                pathname: "/",
            });
        }
        
    }
    //handleAddHotelEquipment = this.props.data.handleAddHotelEquipment();
    render() {
        return (
            <div>
                <h2>Hotelequipment list of: "hier kommt hotel name nicht, wie eingrenzen auf nur dieses hotel, dass angeklickt und nur dessen Equipment kommt'?!" {this.props.hotels.hotelid} </h2>
                <div>
                    <a onClick={this.handleAddHotelEquipment} className="btn btn-success">Neues Equipment hinzufügen</a>
                </div>
                <p>
                </p>
                <div className="row">
                    <div className="col-md-12">
                        {
                            this.props.hotels.map(hotel => (
                                <Hotel hotels={hotel} />
                            )),
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
    hotels: hotelSelectors.getHotels(store),
    hotelequipments: equipmentSelectors.getHotelEquipment(store),
    user: authSelectors.getUserData(store),
    isLoggedIn: authSelectors.isLoggedIn(store),
    isManager: authSelectors.isManager(store)
});

const mapActions = { ...hotelactions, ...hotelequipmentactions };

export default connect(mapSelectors, mapActions)(HotelEquipmentPage);