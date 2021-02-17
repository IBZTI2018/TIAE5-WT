import { Component } from "react";
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StarRating from '../offer/StarRating';

export default class ReservationRow extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      showRatingModal: false
    }

    this.handleEvaluation = this.handleEvaluation.bind(this);
    this.handleNoEvaluate = this.handleNoEvaluate.bind(this);
    this.handleSubmitReview = this.handleSubmitReview.bind(this);
  }

  handleEvaluation(event) {
    event.preventDefault();

    this.setState({showRatingModal: true})
  }

  handleNoEvaluate(event) {
    event.preventDefault();

    this.setState({showRatingModal: false})
  }

  handleSubmitReview(event) {
    event.preventDefault();

    console.log("!!")
  }

  render() {
    return (
      <>
        <tr>
            <th scope="row">{this.props.reservation.id}</th>
            <td>{this.props.reservation.offer.hotelroom.hotel.hotelname}</td>
            <td>{this.props.reservation.offer.hotelroom.roomname}</td>
            <td>{this.props.reservation.checkin}</td>
            <td>{this.props.reservation.checkout}</td>
            <td>
            { moment().isAfter(moment(this.props.reservation.checkout)) &&
              <a className="btn btn-primary mt-1" type="button" href="#" onClick={this.handleEvaluation}>Evaluate</a>
            }
            </td>
        </tr>
        {
          this.state.showRatingModal && 
          <tr>
            <td colSpan="6">
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Modal.Title>Write a review</Modal.Title>
                </Modal.Header>
              
                <Modal.Body>
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="well well-sm">
                          <div className="row" id="post-review-box">
                            <div className="col-md-12">
                              <form>
                                <input id="ratings-hidden" name="rating" type="hidden" /> 
                                <textarea className="form-control animated" cols="50" id="new-review" name="comment" placeholder="Enter your rating here ..." rows="5"></textarea>
                                <hr />
                                <h4>Stars</h4>
                                <StarRating feedback={this.handleStarsFeedback}/>
                              </form>
                            </div>
                          </div>
                        </div> 
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleNoEvaluate}>Close</Button>
                  <Button variant="primary" onClick={this.handleSubmitReview}>Submit</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </td>
          </tr>
        }
      </>
    );
  }
}
