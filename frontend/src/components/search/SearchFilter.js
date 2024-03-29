import React, { Component } from "react";
import { withRouter } from "react-router";
import SearchInput from "./SearchInput";
import Datepicker from "./Datepicker";
import GuestCounter from "./GuestCounter";
import { connect } from "react-redux";
import * as actions from "../../redux/offers/actions";
import * as selectors from "../../redux/offers/selectors";

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    let queryString = Object.keys(this.props.query)
      .map((key) => key + "=" + this.props.query[key])
      .join("&");
    this.props.history.push({
      pathname: "/offers",
      search: "?" + queryString,
    });
    const { fetchOffers } = this.props;
    fetchOffers();
    event.preventDefault();
    return false;
  }

  render() {
    return (
      <div className="bg-warning p-3 rounded-sm">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Destination</label>
            <SearchInput />
            <small id="emailHelp" className="form-text text-muted">
              E.g: Lenzerheide
            </small>
          </div>
          <div className="form-group">
            <label>Check-in & Check-out date</label>
            <Datepicker />
          </div>
          <div className="form-group">
            <label>Number of guests </label>
            <GuestCounter />
          </div>
          <div className="form-group">
            <button className="btn btn-block btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapSelectors = (store) => ({
  query: {
    searchQuery: selectors.getSearchQuery(store),
    startDate: selectors.getStartDateFormatted(store),
    endDate: selectors.getEndDateFormatted(store),
    guestCounter: selectors.getGuestCounter(store),
  },
});

const mapActions = { ...actions };

export default connect(mapSelectors, mapActions)(withRouter(SearchFilter));
