import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Datepicker from './Datepicker';
import GuestCounter from './GuestCounter';

class BookingSearchFilter extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            searchInput: '',
            startDate: null,
            endDate: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ searchInput: event.target.value });
    }

    handleSubmit(event) {
        this.props.history.push({
            pathname: '/offers',
            data: { ...this.state }
        });
        event.preventDefault();
    }

    handleDatesChange = (startDate, endDate) => {
        this.setState({ startDate, endDate })
    }

    handleGuestChange = (guestCounter) => {
        this.setState({ guestCounter })
    }

    render() {
        return (
            <div class="bg-warning p-3">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Destination</label>
                        <input type="text" className="form-control" placeholder="Nach Hotel / Gebiet / Angebot suchen" value={this.state.searchInput} onChange={this.handleChange} />
                        <small id="emailHelp" class="form-text text-muted">Bsp: Lenzerheide</small>
                    </div>
                    <div className="form-group">
                        <label>Check-in & Check-out date</label>
                        <Datepicker onDatesChange={this.handleDatesChange}/>
                    </div>
                    <div className="form-group">
                        <label>Anzahl Gäste</label>
                        <GuestCounter onGuestChange={this.handleGuestChange} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block btn-primary" type="submit">Suchen</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(BookingSearchFilter);