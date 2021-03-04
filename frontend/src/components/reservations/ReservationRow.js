import { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StarRating from '../offer/StarRating';
import { createRating } from '../../redux/ratings/actions';
import * as toast from "../../toast";

class ReservationRow extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      showRatingModal: false,
      feedbackComment: "",
      feedbackScore: 0,
      feedbackAnonymous: false,
      selectedReservation: null,
      hasWrittenReview: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleEvaluation = this.handleEvaluation.bind(this);
    this.handleNoEvaluate = this.handleNoEvaluate.bind(this);
    this.handleSubmitReview = this.handleSubmitReview.bind(this);
    this.handleStarsFeedback = this.handleStarsFeedback.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleEvaluation(event, id) {
    event.preventDefault();

    this.setState({showRatingModal: true, selectedReservation: id})
  }

  handleNoEvaluate(event) {
    if (event) event.preventDefault();

    this.setState({showRatingModal: false, selectedReservation: null})
  }

  handleSubmitReview(event) {
    event.preventDefault();

    const { createRating } = this.props;
    createRating({
      comment: this.state.feedbackComment,
      score: this.state.feedbackScore,
      anonymous: this.state.feedbackAnonymous
    }, this.state.selectedReservation).then(() => {
      this.handleNoEvaluate();

      // Quick hack to hide the button of the stay we just reviewed, as there is no editing
      this.setState({hasWrittenReview: true})

      toast.success("Successfully left review!");
    }).catch(() => {
      toast.error("Failed to leave review!");
    })
  }

  handleStarsFeedback(score) {
    this.setState({feedbackScore: score})
    return false;
  }

  render() {
    console.log(this.props.reservation);
    return (
      <>
        <tr>
            <th scope="row">{this.props.reservation.id}</th>
            <td>
              <a href={`/hotels/${this.props.reservation.offer.hotelroom.hotel.id}`}>
                {this.props.reservation.offer.hotelroom.hotel.hotelname}
              </a>
            </td>
            <td>{this.props.reservation.offer.hotelroom.roomname}</td>
            <td>{this.props.reservation.checkin}</td>
            <td>{this.props.reservation.checkout}</td>
            <td>{this.props.reservation.offer.price} CHF</td>
            <td>
            { moment().isAfter(moment(this.props.reservation.checkout)) && !this.props.reservation.rating && !this.state.hasWrittenReview &&
              <a className="btn btn-primary mt-1" type="button" href="#" onClick={(e) => this.handleEvaluation(e, this.props.reservation.id)}>Evaluate</a>
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
                      <div className="col-md-12">
                        <form>
                          <input id="ratings-hidden" name="rating" type="hidden" /> 
                          <textarea className="form-control animated" cols="50" id="new-review" name="feedbackComment" placeholder="Did you enjoy your stay? Leave the owner some feedback ..." rows="5" value={this.state.feedbackComment} onChange={this.handleChange} />
                          <input type="checkbox" id="feedbackAnonymous" name="feedbackAnonymous" value={this.state.feedbackAnonymous} onChange={this.handleChange} />
                          <label htmlFor="feedbackAnonymous">Post anonymous review</label>
                          <hr />
                          <h6>Your Rating</h6>
                          <StarRating feedback={this.handleStarsFeedback}/>
                        </form>
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

export default connect(null, { createRating })(ReservationRow);
