import React, { Component } from 'react';
import Reservations from '../components/Reservations';
import { connect } from 'react-redux';
import * as actions from '../redux/reservations/actions';
import * as selectors from '../redux/reservations/selectors';
import Loader from '../components/Loader';
import moment from 'moment';

class ReservationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pastReservations: [],
            nextReservations: [],
            isLoading: true
        }
    }

    componentDidMount() {
        const { fetchReservations } = this.props;
        fetchReservations().then(() => {
            this.setState({
                pastReservations: this.props.reservations.filter((r) => moment().isAfter(moment(r.checkout))),
                nextReservations: this.props.reservations.filter((r) => moment().isBefore(moment(r.checkout)))
            })
        }).finally(() => {
            this.setState({isLoading: false})
        })
    }

    render() {
        return (
            <div>
                <h1>Reservation overview: </h1>
                { (this.props.isLoading || this.state.isLoading) && 
                    <Loader />
                }
                { !(this.props.isLoading || this.state.isLoading) &&
                    <div>
                        <Reservations title="Upcoming reservations" reservations={this.state.nextReservations} />
                        <Reservations title="Past reservations" reservations={this.state.pastReservations} />
                    </div>
                }
            </div>
        );
    }
}

const mapSelectors = (store) => ({
    reservations: selectors.reservations(store),
    isLoading: selectors.isLoading(store)
})

export default connect(mapSelectors, { ...actions })(ReservationPage);