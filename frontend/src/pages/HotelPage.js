import React, { Component } from 'react';
import Loader from '../components/Loader';
import { connect } from "react-redux";
import * as selectors from "../redux/hotels/selectors";
import * as actions from "../redux/hotels/actions";

class HotelPage extends Component {
    constructor(props) {
      super(props);

      this.state = {
        hasLoadedHotelData: false
      }
    }
  
    componentDidMount() {
      const hotelId = this.props.match.params.id;
      const { fetchHotel } = this.props;

      fetchHotel(hotelId).then(() => this.setState({hasLoadedHotelData: true}))
    }
  
    render() {
      return(
      <div>
        { this.state.hasLoadedHotelData &&
          <div></div>
        }

        { !this.state.hasLoadedHotelData &&
          <Loader />
        }
      </div>
      );
    //     let offer = undefined;
    //     if (this.props.location.state != undefined) {
    //         offer = this.props.location.state.offer
    //     }
    //     return (
    //         <div>
    //             <h1>Booking overview: </h1>
    //             {offer && (
    //                 <Booking offer={offer} />
    //             )}
    //             {!offer && (
    //                 <p>No offer was chosen</p>
    //             )}
    //         </div>
    //     );
    }
}

const mapSelectors = (store) => ({
  hotel: selectors.getHotel(store)
})

export default connect(mapSelectors, { ...actions })(HotelPage);
