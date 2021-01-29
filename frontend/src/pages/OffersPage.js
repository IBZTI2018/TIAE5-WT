import React, { Component } from 'react';
import Offer from '../components/Offer';
import { connect } from 'react-redux';
import SearchFilter from '../components/search/SearchFilter';
import { readEndpoint } from 'redux-json-api';

class OffersPage extends Component {
    componentWillMount() {
        this.props.dispatch(readEndpoint('offers?include=hotelroom&include=hotelroom.hotel'));
    }

    render() {
        return (
            <div> 
                <h2>Angebotsliste: </h2>
                <div className="row">
                    <div className="col-md-12">
                    <div>
                        {this.props.offers.map(offer => (
                            {offer}
                        ))}
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <SearchFilter />
                    </div>
                    <div className="col-md-8">
                        {
                            this.props.offers.map(offer => (
                                <Offer data={offer} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    offers: state.offers || [],
  }))(OffersPage);
