import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import { connect } from 'react-redux';
import moment from 'moment';
import * as selectors from '../../redux/offers/selectors';
import * as actions from '../../redux/offers/actions';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class Datepicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: null
        }
    }

    handleOnDatesChange = ({ startDate, endDate }) => {
        // Actions
        const { setStartDate, setEndDate } = this.props;
        setStartDate(startDate);
        setEndDate(endDate);
    }

    render() {
        // Selectors
        const { startDate, endDate } = this.props;

        return (
            <DateRangePicker 
                startDatePlaceholderText="From"
                startDate={startDate}
                startDateId="startDate"
                onDatesChange={this.handleOnDatesChange}
                endDatePlaceholderText="To"
                endDate={endDate}
                endDateId="endDate"
                minDate = {moment()}
                displayFormat="DD/MM/yyyy"
                focusedInput={this.state.focus}
                onFocusChange={focus => this.setState({ focus })}
            />
        );
    }
}

const mapSelectors = store => ({
    startDate: selectors.getStartDate(store),
    endDate: selectors.getEndDate(store)
});

const mapActions = {  ...actions };

export default connect(mapSelectors, mapActions)(Datepicker);