import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class Datepicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            focus: null
        }
    }

    handleOnDatesChange = ({ startDate, endDate }) => {
        this.setState({ startDate, endDate });
        this.props.onDatesChange(startDate, endDate);
    }

    render() {
        return (
            <DateRangePicker 
                startDatePlaceholderText="Von"
                startDate={this.state.startDate}
                startDateId="startDate"
                onDatesChange={this.handleOnDatesChange}
                endDatePlaceholderText="Bis"
                endDate={this.state.endDate}
                endDateId="endDate"
                minDate = {new Date()}
                displayFormat="DD/MM/yyyy"
                focusedInput={this.state.focus}
                onFocusChange={focus => this.setState({ focus })}
            />
        );
    }
}

export default Datepicker;