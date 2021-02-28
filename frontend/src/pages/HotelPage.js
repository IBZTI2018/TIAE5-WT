import React, { Component } from 'react';
import Loader from '../components/Loader';
import Review from '../components/Review';
import HotelStars from '../components/hotel/HotelStars';
import PromoDrop from '../components/hotel/PromoDrop';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import * as selectors from "../redux/hotels/selectors";
import * as authSelectors from "../redux/auth/selectors";
import * as hotelequipmentsSelectors from "../redux/hotelequipments/selectors";
import * as actions from "../redux/hotels/actions";
import * as hotelequipmentsActions from "../redux/hotelequipments/actions";
import * as toast from '../toast';
import auth from '../redux/auth';
import api from "../redux/api";

class HotelPage extends Component {
    constructor(props) {
      super(props);

      this.state = {
        hasLoadedHotelData: false,
        hotelequipments: []
      }

      this.handleBooking = this.handleBooking.bind(this);
      this.handlePromo = this.handlePromo.bind(this);
      this.handleAssignHotelEquipments = this.handleAssignHotelEquipments.bind(this);
      this.handleUnassignHotelequipment = this.handleUnassignHotelequipment.bind(this);
    }
  
    componentDidMount() {
      const hotelId = this.props.match.params.id;
      const { fetchHotel, fetchHotelequipments } = this.props;

      fetchHotel(hotelId).then(() => this.setState({hasLoadedHotelData: true}));
      fetchHotelequipments();
    }

    handleMultipleChange = (event) => {
      this.setState({
        hotelequipments: Array.from(
          event.target.selectedOptions,
          (item) => item.value
        ),
      });
    };
  
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

    handleAssignHotelEquipments(event) {
      for (let hotelequipment of this.state.hotelequipments) {
        let fakeObj = api.create("hotel_hotelequipments");
        fakeObj.set("hotel_id", this.props.hotel.id);
        fakeObj.set("hotelequipment_id", hotelequipment);
        fakeObj.sync();
      }
      this.props.fetchHotel(this.props.hotel.id);
      toast.success("The hotel equipments were successfully assigned!");
      event.preventDefault();

      // JsonAPI library bugs out
      window.location.reload();

      return false;
    }

    handleUnassignHotelequipment = hotelequipment => event => {
      let fakeObj = api.create("hotel_hotelequipments");
      fakeObj._base.id = [this.props.hotel.id, hotelequipment.id].join(':');
      fakeObj.delete((e) => {
        // Please just don't ask what this library is doing internally...
        if (e.status === undefined) {
          toast.error('Failed to unassign hotel equipment!');
          return;
        }

        toast.success('The hotel equipment was successfully unassigned!');

        this.props.hotel.hotelequipments = this.props.hotel.hotelequipments.filter((e) => {
          return e.id != hotelequipment.id;
        });

        // Force a reload without re-fetching data because of the JSON-API
        this.setState({__forceReload: Math.random()})
      });
    }

    getTotalRevenue() {
      let totalRevenue = 0;
      for (let hotelroom of this.props.hotel.hotelrooms) {
        for (let offer of hotelroom.offers) {
          if (offer.booked) {
            totalRevenue += parseFloat(offer.price);
          }
        }
      }
      return totalRevenue;
    }

    isManager() {
      if (this.props.userData) {
        if (this.props.userData.isManager) {
          return true;
        }
      }
      return false;
    }

    getReservationsTable() {
      let data = [];
      for (let hotelroom of this.props.hotel.hotelrooms) {
        if (!hotelroom.offers || hotelroom.offers.length < 1) continue;
        for (let offer of hotelroom.offers) {
          if (!offer.reservations || offer.reservations.length < 1) continue;
          for (let reservation of offer.reservations) {
            data.push(
              {
                id: reservation.id,
                customerName: [reservation.user.firstname, reservation.user.lastname].join(" "),
                customerEmail: reservation.user.email,
                roomNumber: hotelroom.roomnumber + " (" + hotelroom.roomname + ")",
                duration: [reservation.checkin, reservation.checkout].join(" - "),
                paid: offer.price + " CHF"
              }
            )
          }
        }
      }
      return data;
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
                this.isManager() && this.props.hotel.can_manage &&
                <div className="managerArea">
                  <h3>Management Area</h3>

                  <div className="card mb-3">
                    <div className="card-header">
                      Manage your Hotel
                    </div>
                    <div className="card-body">
                      <Link to={'/hotels/' + this.props.hotel.id + '/stats'}  className="btn btn-success ml-2">Statistics</Link>
                      <Link to={'/hotels/' + this.props.hotel.id + '/hotelrooms'} className="btn btn-dark ml-2">View Hotel rooms</Link>
                      <Link to={'/hotels/' + this.props.hotel.id + '/hotelrooms/create'} className="btn btn-warning ml-2">Create Hotel room</Link>
                      <hr className="visible-divider" />
                      <div className="row">
                        <div className="col-md-6">
                          <h3>Assigned hotel equipments</h3>
                          {!this.props.hotel.hotelequipments && (
                            <p>
                              Currently this hotel has no hotel equipments assigned.<br />
                              Please assign some on your right.
                            </p>
                          )}
                          {this.props.hotel.hotelequipments &&
                            this.props.hotel.hotelequipments.map((hotelequipment) => (
                              <span className="badge badge-dark mr-2">
                                {hotelequipment.description}
                                <button type="button" className="close" onClick={this.handleUnassignHotelequipment(hotelequipment)}>
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </span>
                            ))
                          }
                        </div>
                        <div className="col-md-6">
                          <h3>Assign hotel equipments</h3>
                          <select
                            value={this.state.hotelequipments}
                            onChange={this.handleMultipleChange}
                            name="hotelequipments"
                            className="form-control"
                            placeholder="Hotel equipment"
                            size="10"
                            multiple
                          >
                            {this.props.all_hotelequipments.map((hotelequipment) => (
                              <option value={hotelequipment.id}>
                                {hotelequipment.description}
                              </option>
                            ))}
                          </select>
                          <a href="#" className="btn btn-primary mt-3" onClick={this.handleAssignHotelEquipments}>Assign hotel equipments</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card mb-3">
                    <div className="card-header">
                      Total revenue
                    </div>
                    <div className="card-body">
                      <h3>{this.getTotalRevenue()} CHF</h3>
                    </div>
                  </div>

                  <div className="card mb-3">
                    <div className="card-header">
                      Reservations list
                    </div>
                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Customer E-Mail</th>
                            <th scope="col">Room Number</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Paid</th>
                          </tr>
                        </thead>
                        <tbody>
                          
                          {this.getReservationsTable().map(row => (
                            <tr>
                              <th scope="row">{row.id}</th>
                              <td>{row.customerName}</td>
                              <td>{row.customerEmail}</td>
                              <td>{row.roomNumber}</td>
                              <td>{row.duration}</td>
                              <td>{row.paid}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

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
  userData: authSelectors.getUserData(store),
  all_hotelequipments: hotelequipmentsSelectors.getHotelequipments(store)
})

export default connect(mapSelectors, { ...actions, ...hotelequipmentsActions })(withRouter(HotelPage));
