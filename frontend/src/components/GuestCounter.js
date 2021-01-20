import React, { Component } from 'react';

class GuestCounter extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            counter: 1
        };

        this.handleMinus = this.handleMinus.bind(this);
        this.handlePlus = this.handlePlus.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    counterHandler(newCounter) {
        if (newCounter > 100) {
            newCounter = 100;
        }
        else if (newCounter < 1) {
            newCounter = 1;
        }

        this.setState({ counter: newCounter });
        this.props.onGuestChange(newCounter);
    }

    handleMinus(event) {
        let newCounter = this.state.counter - 1;
        this.counterHandler(newCounter);
    }

    handlePlus(event) {
        let newCounter = this.state.counter + 1;
        this.counterHandler(newCounter);
    }

    handleChange(event) {
        let newCounter = parseInt(event.target.value || 1);
        this.counterHandler(newCounter);
    }

    render() {
        return (
            <div>
                <div class="input-counter">
                    <button type="button" class="btn btn-light btn-number" data-type="minus" data-field="quant[1]" onClick={this.handleMinus}>
                        <span class="fa fa-minus"></span>
                    </button>
                    <input type="number" name="quant[1]" class="form-control input-number" value={this.state.counter} onChange={this.handleChange} />
                    <button type="button" class="btn btn-light btn-number" data-type="plus" data-field="quant[1]" onClick={this.handlePlus}>
                        <span class="fa fa-plus"></span>
                    </button>
                </div>
            </div>
        );
    }
}

export default GuestCounter;