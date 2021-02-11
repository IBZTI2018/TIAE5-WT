import React, { Component } from 'react';
import api from "../../redux/api";
import { connect } from "react-redux";
import * as actions from "../../redux/hotels/actions";
import * as toast from '../../toast';

class MyOfferCard extends Component {
  constructor(props) {
    super(props);
    this.deleteOffer = this.deleteOffer.bind(this);
  }

  deleteOffer(event) {
    const { fetchHotels } = this.props;
    let fakeOffer = api.create("offers");
    fakeOffer._base.id = this.props.offer.id;
    fakeOffer.delete(() => { 
      toast.success('The offer was successfully deleted. Fetching list again.');
      fetchHotels();
    });
    event.preventDefault();
    return false;
  }

  render() {
    return (
      <div className="mb-5">
        <div className="card">
          <div className="card-header">
            Offer # {this.props.offer.id}
            <a
              href="#"
              class="btn btn-danger btn-sm ml-4"
              onClick={this.deleteOffer}
            >
              Delete Offer
            </a>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Price</th>
                  <th scope="col">Validity start</th>
                  <th scope="col">Validity start</th>
                  <th scope="col">Hotelroom ID</th>
                  <th scope="col">Guests</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">{this.props.offer.price}</td>
                  <td scope="row">{this.props.offer.validitystart}</td>
                  <td scope="row">{this.props.offer.validityend}</td>
                  <td scope="row">#{this.props.offer.hotelroom.id}</td>
                  <td scope="row">{this.props.offer.hotelroom.persons} Persons</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapSelectors = (store) => ({})

export default connect(mapSelectors, { ...actions })(MyOfferCard);
