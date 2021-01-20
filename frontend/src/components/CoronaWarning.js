import React, { Component } from 'react';

class CoronaWarning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dismiss: false
        }
    }

    handleClick = () => {
        this.setState({ dismiss: true });
    }

    render() {
        return (
            <div>
                { this.state.dismiss == false && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <div className="container">
                            <h6>Coronavirus (COVID-19) Support</h6>
                            <p>
                                Bitte überprüfen Sie die Reisebeschränkungen. Reisen sind möglicherweise nur für bestimmte Zwecke gestattet, insbesondere touristische Reisen sind möglicherweise nicht gestattet.
                                </p>
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleClick}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default CoronaWarning;