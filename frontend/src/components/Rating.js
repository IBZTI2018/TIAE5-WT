import React, { Component } from 'react';

class Rating extends Component {
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
                        <div className="float-right">
                            <div>
                                <i className="fa fa-star md" aria-hidden="true"></i>
                            </div>
                            <a className="btn btn-danger btn-sm" href="#" id="close-review-box">
                            <span className="glyphicon glyphicon-remove"></span>Abbrechen</a>
                            <button className="btn btn-success mt-1 ml-2" type="submit">Speichern</button>
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

export default Rating;