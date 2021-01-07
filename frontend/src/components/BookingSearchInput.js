import React, { Component } from 'react';
import { withRouter } from 'react-router';

class BookingSearchInput extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.props.history.push('/offers');
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group input-group-lg mt-5">
                    <input type="text" className="form-control" placeholder="Nach Hotel / Gebiet / Angebot suchen..."
                        aria-label="Nach Hotel / Gebiet / Angebot suchen..." aria-describedby="basic-addon2" 
                        value={this.state.value} onChange={this.handleChange} />
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