import React, { Component } from 'react';
import { withRouter } from 'react-router';
import SearchInput from './SearchInput';
import Datepicker from './Datepicker';
import GuestCounter from './GuestCounter';

class SearchFilter extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
        this.props.history.push('/offers');
        event.preventDefault();
    }

    render() {
        return (
            <div className="bg-warning p-3 rounded-sm">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Destination</label>
                        <SearchInput />
                        <small id="emailHelp" className="form-text text-muted">Bsp: Lenzerheide</small>
                    </div>
                    <div className="form-group">
                        <label>Check-in & Check-out date</label>
                        <Datepicker />
                    </div>
                    <div className="form-group">
                        <label>Anzahl Gäste</label>
                        <GuestCounter />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block btn-primary" type="submit">Suchen</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SearchFilter);