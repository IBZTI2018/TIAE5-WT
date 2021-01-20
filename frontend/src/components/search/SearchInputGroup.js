import React, { Component } from 'react';
import { withRouter } from 'react-router';
import SearchInput from './SearchInput';
import Datepicker from './Datepicker';
import GuestCounter from './GuestCounter';

class SearchInputGroup extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
        this.props.history.push('/offers');
        event.preventDefault();
        return false;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="BookingSearchInput">
                <div className="input-group input-group-lg mt-5">
                    <SearchInput />
                    <div className="input-group-append">
                        <Datepicker />
                        <GuestCounter />
                        <button className="btn btn-primary" type="submit">Suchen</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default withRouter(SearchInputGroup);