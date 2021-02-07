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

            fetchHotels();
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
                <h2>
                    Hotels of: {this.props.user.firstname}{" "}{this.props.user.lastname}
                </h2>
                <div className="row">
                    <div className="col-md-12">
                        {
                            this.props.hotels.map(hotel => (
                                <Hotel hotels={hotel} />
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
    isManager: authSelectors.isManager(store),
    user: authSelectors.getUserData(store)
});

const mapActions = { ...actions };

export default connect(mapSelectors, mapActions)(HotelsPage);
