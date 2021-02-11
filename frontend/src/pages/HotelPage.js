import React, { Component } from 'react';
import Loader from '../components/Loader';
import Review from '../components/Review';
import HotelStars from '../components/hotel/HotelStars';
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
      const encodedName = encodeURIComponent(this.props.hotel.hotelname)

      this.props.history.push(`/offers?searchQuery=${encodedName}`);
    }

    render() {
      return(
      <div>
        { this.state.hasLoadedHotelData &&
          <div className="card">
            <h5 className="card-header">{this.props.hotel.hotelname}</h5>
            <div className="card-body">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    className="img-fluid rounded"
                    src={this.props.hotel.image}
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <h5 className="card-title">
                    {this.props.hotel.hotelcategory.description}
                    <HotelStars hotel={this.props.hotel} />
                  </h5>
                  <p className="card-text">{this.props.hotel.description}</p>
                  <a href="#" className="btn btn-primary" onClick={this.handleBooking}>Book here!</a>
                </div>
              </div>

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
