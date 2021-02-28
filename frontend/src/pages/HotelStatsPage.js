import React, { Component } from "react";
import { Doughnut, Pie, Line } from "react-chartjs-2";
import { connect } from "react-redux";
import * as hotelSelectors from "../redux/hotels/selectors";
import * as hotelActions from "../redux/hotels/actions";

class HotelStatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donutOptions: {
        responsive: true,
        centerText: {
          display: true,
          text: "280",
        },
      },
    };
  }

  componentDidMount() {
    const { fetchHotelStats } = this.props;
    fetchHotelStats(this.props.match.params.id);
  }

  getRatings() {
    let parsedData = [];
    if (this.props.stats && this.props.stats.ratings) {
      parsedData = [
        this.props.stats.ratings.positive,
        this.props.stats.ratings.positive,
      ];
    }
    return {
      labels: ["Positive", "Negative"],
      datasets: [
        {
          data: parsedData,
          backgroundColor: ["green", "red"],
        },
      ],
    };
  }

  getRatingsTotal() {
    let parsedTotal = 0;
    if (this.props.stats && this.props.stats.ratings) {
      parsedTotal = this.props.stats.ratings.total;
    }
    return parsedTotal;
  }

  getReservations() {
    let parsedData = [];
    if (this.props.stats && this.props.stats.reservations && this.props.stats.reservations.months) {
      parsedData = this.props.stats.reservations.months;
    }
    return {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      datasets: [
        {
          label: "Reservations",
          data: parsedData,
          borderColor: "black"
        },
      ],
    };
  }

  getReservationsTotal() {
    let parsedTotal = 0;
    if (this.props.stats && this.props.stats.reservations) {
      parsedTotal = this.props.stats.reservations.total;
    }
    return parsedTotal;
  }

  getRooms() {
    let parsedData = [];
    if (this.props.stats && this.props.stats.rooms) {
      parsedData = [
        this.props.stats.rooms.free,
        this.props.stats.rooms.occupied,
      ];
    }
    return {
      labels: ["Free", "Occupied"],
      datasets: [
        {
          data: parsedData,
          backgroundColor: ["deepskyblue", "goldenrod"],
        },
      ],
    };
  }

  getRoomsTotal() {
    let parsedTotal = 0;
    if (this.props.stats && this.props.stats.rooms) {
      parsedTotal = this.props.stats.rooms.total;
    }
    return parsedTotal;
  }

  render() {
    return (
      <div>
        <div className="col-md-12">
          <h3>Ratings of customers</h3>
          <h4>Total of {this.getRatingsTotal()} ratings</h4>
          <Doughnut
            data={this.getRatings()}
            options={this.state.donutOptions}
          />
        </div>
        <div className="col-md-12">
          <h3>Reservations by month</h3>
          <h4>Total of {this.getReservationsTotal()} reservations</h4>
          <Line
            data={this.getReservations()}
            options={this.state.donutOptions}
          />
        </div>
        <div className="col-md-12">
          <h3>Rooms</h3>
          <h4>Total of {this.getRoomsTotal()} rooms</h4>
          <Pie
            data={this.getRooms()}
            options={this.state.donutOptions}
          />
        </div>
      </div>
    );
  }
}

const mapSelectors = (store) => ({
  stats: hotelSelectors.getHotelStats(store),
});

const mapActions = { ...hotelActions };

export default connect(mapSelectors, mapActions)(HotelStatsPage);
