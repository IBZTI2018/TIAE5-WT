import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../redux/offers/selectors';
import * as actions from '../../redux/offers/actions';

class GuestCounter extends Component {
    render() {
        // Selectors
        const { guestCounter } = this.props;

        // Actions
        const { decreaseGuestCounter, increaseGuestCounter, setGuestCounter } = this.props;

        return (
            <div>
                <div className="input-counter">
                    <button type="button" className="btn btn-light btn-number" onClick={e => decreaseGuestCounter()}>
                        <span className="fa fa-minus"></span>
                    </button>
                    <input type="number" className="form-control input-number" value={guestCounter} onChange={e => setGuestCounter(parseInt(e.target.value || 1))} />
                    <button type="button" className="btn btn-light btn-number" onClick={e => increaseGuestCounter()}>
                        <span className="fa fa-plus"></span>
                    </button>
                </div>
            </div>
        );
    }
}

const mapSelectors = store => ({
    guestCounter: selectors.getGuestCounter(store)
});

const mapActions = {  ...actions };

export default connect(mapSelectors, mapActions)(GuestCounter);