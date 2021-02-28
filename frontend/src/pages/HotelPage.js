import React, { Component } from 'react';
import Loader from '../components/Loader';
import Review from '../components/Review';
import HotelStars from '../components/hotel/HotelStars';
import PromoDrop from '../components/hotel/PromoDrop';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as selectors from "../redux/hotels/selectors";
import * as authSelectors from "../redux/auth/selectors";
import * as actions from "../redux/hotels/actions";
import * as toast from '../toast';
import auth from '../redux/auth';

class HotelPage extends Component {
    constructor(props) {
      super(props);

      this.state = {
        hasLoadedHotelData: false
      }

      this.handleBooking = this.handleBooking.bind(this);
      this.handlePromo = this.handlePromo.bind(this);
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

    handlePromo(file, contents) {
      const { dropHotelPromo } = this.props;
      dropHotelPromo(this.props.hotel.id, contents)
        .then(() => toast.success("Successfully sent promo to customers."))
        .catch(() => toast.error("Failed to send promo to customers, please try again in a few minutes."))
    }

    isManager() {
      if (this.props.userData) {
        if (this.props.userData.isManager) {
          return true;
        }
      }
      return false;
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
                    {
                      this.props.hotel.hotelcategory && (
                        <label>{this.props.hotel.hotelcategory.description}</label>
                      )
                    }
                    <HotelStars hotel={this.props.hotel} />
                  </h5>
                  <p className="card-text">{this.props.hotel.description}</p>
                  {
                    !this.isManager() &&
                    <a href="#" className="btn btn-primary" onClick={this.handleBooking}>Book here!</a>
                  }
                </div>
              </div>

              <hr className="visible-divider" />

              {
                this.isManager() &&
                <div className="managerArea">
                  <h3>Management Area</h3>

                  <div className="card">
                    <div className="card-header">
                      Send some promo to your guests!
                    </div>
                    <div className="card-body">
                      Upload your hotel promo brochures (as PDF with a maximum file size of 1MB) here, to automatically send them to all of your past hotel customers via E-Mail.

                      <div className="decorated-dropzone">
                        <PromoDrop hotel={this.props.hotel} handlePromo={this.handlePromo} />
                      </div>
                    </div>
                  </div>

                  <hr className="visible-divider" />
                </div>
              }

              <h3>What others had to say</h3>
              {
                this.isManager() &&
                this.props.hotel.ratings
                  .map((rating) => ( <Review review={rating} isManager={true} /> ))
              }
              {
                !this.isManager() &&
                this.props.hotel.ratings.filter((rating) => rating.published == true)
                  .map((rating) => ( <Review review={rating} isManager={true} /> ))
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
  hotel: selectors.getHotel(store),
  userData: authSelectors.getUserData(store)
})

export default connect(mapSelectors, { ...actions })(withRouter(HotelPage));
