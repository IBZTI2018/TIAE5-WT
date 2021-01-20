import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Datepicker from './Datepicker';

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

    render() {
        return (
            <div class="bg-warning p-3">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group input-group-lg">
                        <input type="text" className="form-control" placeholder="Nach Hotel / Gebiet / Angebot suchen" value={this.state.searchInput} onChange={this.handleChange} />
                        <div className="input-group-append">
                            <Datepicker onDatesChange={this.handleDatesChange}/>
                            <button className="btn btn-outline-secondary" type="button">Gäste</button>
                            <button className="btn btn-primary" type="submit">Suchen</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(BookingSearchFilter);