import React, { Component } from "react";
import { withRouter } from "react-router";
import SearchInput from "./SearchInput";
import Datepicker from "./Datepicker";
import GuestCounter from "./GuestCounter";
import { connect } from "react-redux";
import * as selectors from "../../redux/offers/selectors";

class SearchInputGroup extends Component {
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
    event.preventDefault();
    return false;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="BookingSearchInput">
        <div className="input-group input-group-lg mt-5">
          <SearchInput />
          <div className="input-group-append">
            <Datepicker />
            <GuestCounter />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
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

export default connect(mapSelectors)(withRouter(SearchInputGroup));
