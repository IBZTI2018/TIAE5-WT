import { Component } from "react";

export default class HotelStars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stars: ""
    }

    if (!props.hotel) return;
    if (!props.hotel.hotelcategory) return;
    if (!props.hotel.hotelcategory.stars) return;
    
    this.state.stars = "★".repeat(props.hotel.hotelcategory.stars);
  }

  render() {
    return (<span className="hotel-stars"> {this.state.stars} </span>);
  }
}
