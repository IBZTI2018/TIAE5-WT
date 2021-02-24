import React, { Component } from "react";
import MyOfferCard from "../components/myoffer/MyOfferCard";
import MyOfferForm from "../components/myoffer/MyOfferForm";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as hotelSelectors from "../redux/hotels/selectors";
import * as actions from "../redux/hotels/actions";
import _ from "lodash";

class MyOffersPage extends Component {
  componentDidMount() {
    const { fetchHotels } = this.props;
    fetchHotels();
  }

  getOffersFromHotels() {
    let offersMultilevel = this.props.hotels.map((hotel) => {
      return hotel.hotelrooms.map((hotelroom) => {
        return hotelroom.offers.map((offer) => {
          return {
            ...offer,
            hotelroom,
            hotel
          }
        });
      });
    });
    let offersFlatten = _.flattenDeep(offersMultilevel);
    return offersFlatten;
  }

  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}`}>
          <h2>My Offers: </h2>
          <div className="row my-4">
            <div className="col-md-12">
              <a
                href="/my_offers/create"
                className="btn btn-warning btn-block"
              >
                Create offer
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {this.getOffersFromHotels().map((offer) => (
                <MyOfferCard offer={offer} />
              ))}
            </div>
          </div>
        </Route>
        <Route path={`${this.props.match.path}/create`}>
          <h2 className="mt-4 mb-4">Create a new offer</h2>
          <MyOfferForm hotels={this.props.hotels} />
        </Route>
      </Switch>
    );
  }
}

const mapSelectors = (store) => ({
  hotels: hotelSelectors.getHotels(store)
});

export default connect(mapSelectors, { ...actions })(MyOffersPage);
