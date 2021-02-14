import React, { Component } from 'react';
import { withRouter } from 'react-router';
import * as toast from "../toast";

class HotelEquipment extends Component {

    constructor(props) {
        super(props);
            this.handleEditHotelEquipment = this.handleEditHotelEquipment.bind(this);
            this.handleDeleteHotelEquipment = this.handleDeleteHotelEquipment.bind(this);
            this.handleAddHotelEquipment = this.handleAddHotelEquipment.bind(this);
    }

    handleEditHotelEquipment(event) {
        this.props.history.push({
            pathname: '/#',
            state: {
                data: this.props.data,
                hotels: this.props.hotels
            }
        })
        event.preventDefault();
        return false;
    }

    handleDeleteHotelEquipment(event) {
        alert("Wollen Sie wirklich das Equipment löschen?");
        //Logik hinzufügen, falls ja gedrückt
        toast.error("Successfully deleted hotelequipment!");
        this.props.history.push({
            pathname: '/hotelequipments',
            state: {
                data: this.props.data,
                hotels: this.props.hotels
            }
        })
        event.preventDefault();
        return false;
    }

    handleAddHotelEquipment(event) {
        this.props.history.push({
            pathname: '/#',
            state: {
                data: this.props.data,
                hotels: this.props.hotels
            }
        })
        event.preventDefault();
        return false;
    }

    render() {
        return (
            <div className="card mb-3 p-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="img-fluid rounded" src={this.props.data.image} alt=".Wie bringe ich entsprechendes Hotel image hier rein, für bezug auf Hotel sichtbar machen?." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">
                                Equipment: {this.props.data.id}
                            </h5>
                            <p className="card-text">{this.props.data.description}</p>
                            <a onClick={this.handleEditHotelEquipment} className="btn btn-warning">Equipment ändern</a>
                            <p></p>
                            <a onClick={this.handleDeleteHotelEquipment} className="btn btn-danger">Equipment löschen</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(HotelEquipment);