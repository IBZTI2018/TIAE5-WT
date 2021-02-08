import React, { Component } from "react";
import Offer from "../components/Offer";
import Loader from "../components/Loader";
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

  renderOffers() {
    const { offers } = this.props;
    if (offers.length > 0) {
      return offers.map((offer) => (<Offer offer={offer} />) )
    }
    else {
      return (<p>There are currently no offers on the server</p>)
    }
  }


  render() {
    // State
    

    return (
      <div>
        <h2>Angebotsliste: </h2>
        <div className="row">
          <div className="col-md-4">
            <SearchFilter />
          </div>
          <div className="col-md-8">
            {this.props.isFetching && (
              <Loader />
            )}
            {!this.props.isFetching && this.renderOffers() }
          </div>
        </div>
      </div>
    );
  }
}

const mapSelectors = (store) => ({
  offers: selectors.getOffers(store),
  isFetching: selectors.isFetching(store)
});

const mapActions = { ...actions };

export default connect(mapSelectors, mapActions)(OffersPage);
