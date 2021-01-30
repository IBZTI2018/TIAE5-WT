import React, { Component } from "react";
import Offer from "../components/Offer";
import { connect } from "react-redux";
import * as selectors from "../redux/offers/selectors";
import * as actions from "../redux/offers/actions";
import SearchFilter from "../components/search/SearchFilter";

class OffersPage extends Component {
  componentWillMount() {
    // Actions
    const { fetchOffers } = this.props;
    fetchOffers();
  }

  render() {
    // State
    const { offers } = this.props;

    return (
      <div>
        <h2>Angebotsliste: </h2>
        <div className="row">
          <div className="col-md-4">
            <SearchFilter />
          </div>
          <div className="col-md-8">
            {offers.length > 0 && offers.map((offer) => (
              <Offer offer={offer} />
            ))}
            {offers.length == 0 && (
              <p>There are currently no offers on the server</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapSelectors = (store) => ({
  offers: selectors.getOffers(store),
});

const mapActions = { ...actions };

export default connect(mapSelectors, mapActions)(OffersPage);
