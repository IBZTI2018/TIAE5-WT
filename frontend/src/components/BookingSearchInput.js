import React, { Component } from 'react';
import { withRouter } from 'react-router';

class BookingSearchInput extends Component {

    constructor(props) {
        super(props);
        this.state = { searchInput: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ searchInput: event.target.value });
    }

    handleSubmit(event) {
        this.props.history.push('/offers');
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group input-group-lg mt-5">
                    <input type="text" className="form-control" placeholder="Nach Hotel / Gebiet / Angebot suchen" value={this.state.searchInput} onChange={this.handleChange} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button">Von / Bis</button>
                        <button className="btn btn-outline-secondary" type="button">Gäste</button>
                        <button className="btn btn-primary" type="submit">Suchen</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default withRouter(BookingSearchInput);