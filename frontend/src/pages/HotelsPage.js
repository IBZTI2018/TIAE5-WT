import React, { Component } from 'react';
import Hotel from '../components/Hotel';
import { connect } from "react-redux";
import * as authSelectors from "../redux/auth/selectors";
import * as hotelSelectors from "../redux/hotels/selectors";
import * as actions from "../redux/hotels/actions";

class HotelsPage extends Component {

    componentDidMount(props) {
        if (this.props.isManager) {
            const { fetchHotels } = this.props;

            // Alternativ
            // const fetchHotels = this.props.fetchHotels;

            // Check if user is logged in?
            // if (!this.props.isLoggedIn) { ...}

            fetchHotels();
        }
        else
        {
            this.props.history.push({
                pathname: "/",
              });
        }

    }

    render() {
        return (
            <div>
                <h2>Hotel list: </h2>
                <div className="row">
                    <div className="col-md-12">
                        {
                            this.props.hotels.map(hotel => (
                                <Hotel data={hotel} />
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
    isLoggedIn: authSelectors.isLoggedIn(store),
    isManager: authSelectors.isManager(store)
});

const mapActions = { ...actions };

export default connect(mapSelectors, mapActions)(HotelsPage);
