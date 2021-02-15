import { Component } from "react";
import moment from 'moment';

export default class ReservationRow extends Component {
  render() {
    return (
    <tr>
        <th scope="row">{this.props.reservation.id}</th>
        <td>{this.props.reservation.offer.hotelroom.hotel.hotelname}</td>
        <td>{this.props.reservation.offer.hotelroom.roomname}</td>
        <td>{this.props.reservation.checkin}</td>
        <td>{this.props.reservation.checkout}</td>
        { moment().isAfter(moment(this.props.reservation.checkout)) &&
          <a className="btn btn-primary mt-1" type="button" href="#">Evaluate</a>
        }
    </tr>
    );
  }
}
