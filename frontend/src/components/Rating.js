import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Rating extends Component {
    constructor(props) {
        super(props);
    this.handleReservation = this.handleReservation.bind(this);
    }

    handleReservation(event) {
        this.props.history.push('/reservation');
        event.preventDefault();
        return false;
    }

    render() {
        return (
            <div>
                	<div className="row">
		<div className="col-md-6">
    	<div className="well well-sm">
            <div className="row" id="post-review-box">
                <div className="col-md-12">
                    <form>
                        <input id="ratings-hidden" name="rating" type="hidden" /> 
                        <textarea className="form-control animated" cols="50" id="new-review" name="comment" placeholder="Gib eine Bewertung ein..." rows="5"></textarea>
                        <hr />
                        <h4>Sterne</h4>
                            <div>
                                <button className="btn btn-secondary ml-1" href="#" type="button">
                                <i className="fa fa-heart mr-2"></i>
                                    1
                                </button>
                                <button className="btn btn-secondary ml-1" href="#" type="button">
                                <i className="fa fa-heart mr-2"></i>
                                    2
                                </button>
                                <button className="btn btn-secondary ml-1" href="#" type="button">
                                <i className="fa fa-heart mr-2"></i>
                                    3
                                </button>
                                <button className="btn btn-secondary ml-1" href="#" type="button">
                                <i className="fa fa-heart mr-2"></i>
                                    4
                                </button>
                                <button className="btn btn-secondary ml-1" href="#" type="button">
                                <i className="fa fa-heart mr-2"></i>
                                    5
                                </button>
                            </div>
                        <hr />
                            <div className="float-right">
                                <button onClick={this.handleReservation} className="btn btn-danger mt-1" type="button">
                                    Abbrechen
                                </button>
                                <button className="btn btn-success mt-1 ml-2" type="button">
                                    Speichern
                                </button>
                            </div>
                    </form>
                </div>
            </div>
        </div> 
         
		</div>
	</div>
            </div>
        );
    }
}

export default withRouter(Rating);