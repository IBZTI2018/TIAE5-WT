import React, { Component } from 'react';
import Loader from '../components/Loader';
import Review from '../components/Review';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as selectors from "../redux/hotels/selectors";
import * as actions from "../redux/hotels/actions";

class HotelPage extends Component {
    constructor(props) {
      super(props);

      this.state = {
        hasLoadedHotelData: false
      }

      this.handleBooking = this.handleBooking.bind(this);
    }
  
    componentDidMount() {
      const hotelId = this.props.match.params.id;
      const { fetchHotel } = this.props;

      fetchHotel(hotelId).then(() => this.setState({hasLoadedHotelData: true}))
    }
  
    handleBooking(event) {
      event.preventDefault();

      // TODO: Redirect to search with predefined hotel name
    }

    renderStars() {
      if (!this.props.hotel) return (<span></span>);
      if (!this.props.hotel.hotelcategory.stars) return (<span></span>);
      const text = "★".repeat(this.props.hotel.hotelcategory.stars);
      return (<span className="hotel-stars"> {text} </span>)
    }

    render() {
      return(
      <div>
        { this.state.hasLoadedHotelData &&
          <div className="card">
            <h5 className="card-header">{this.props.hotel.hotelname}</h5>
            <div className="card-body">
              <h5 className="card-title">
                {this.props.hotel.hotelcategory.description}
                {this.renderStars()}
              </h5>
              <p className="card-text">{this.props.hotel.description}</p>

              <a href="#" className="btn btn-primary" onClick={this.handleBooking}>Book here!</a>

              <hr />

              <h3>What others had to say</h3>
              {
                this.props.hotel.ratings.map((rating) => ( <Review review={rating} /> ))
              }
            </div>
          </div>
        }

        { !this.state.hasLoadedHotelData &&
          <Loader />
        }
      </div>
      );
    }
}

const mapSelectors = (store) => ({
  hotel: selectors.getHotel(store)
})

export default connect(mapSelectors, { ...actions })(withRouter(HotelPage));
