import React, { Component } from "react";
import Offer from "../components/Offer";
import Loader from "../components/Loader";
import { connect } from "react-redux";
import * as selectors from "../redux/offers/selectors";
import * as actions from "../redux/offers/actions";
import SearchFilter from "../components/search/SearchFilter";
import moment from "moment"

class OffersPage extends Component {
  componentWillMount() {
    // Actions
    const {
      fetchOffers,
      setSearchQuery,
      setStartDate,
      setEndDate,
      setGuestCounter,
    } = this.props;
    const searchQuery = this.props.history.location.search;
    if (searchQuery != "") {
      let searchObject = JSON.parse(
        '{"' +
          decodeURI(searchQuery)
            .replace(/^\?+/, "")
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      );

      if (searchObject.searchQuery && searchObject.searchQuery != "null") {
        setSearchQuery(searchObject.searchQuery);
      }

      if (searchObject.startDate && searchObject.startDate != "null") {
        setStartDate(moment(searchObject.startDate));
      }

      if (searchObject.endDate && searchObject.endDate != "null") {
        setEndDate(moment(searchObject.endDate));
      }

      if (searchObject.guestCounter && searchObject.guestCounter != "null") {
        setGuestCounter(searchObject.guestCounter);
      }
    }
    fetchOffers();
  }

  renderOffers() {
    const { offers } = this.props;
    if (offers.length > 0) {
      return offers.map((offer) => <Offer offer={offer} />);
    } else {
      return <center>There are currently no offers for your selected settings.<br />However, we're sure you'll find something if you look aroundsome more!</center>;
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
            {this.props.isFetching && <Loader />}
            {!this.props.isFetching && this.renderOffers()}
          </div>
        </div>
      </div>
    );
  }
}

const mapSelectors = (store) => ({
  offers: selectors.getOffers(store),
  isFetching: selectors.isFetching(store),
});

const mapActions = { ...actions };

export default connect(mapSelectors, mapActions)(OffersPage);
