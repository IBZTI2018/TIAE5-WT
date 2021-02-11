import React, { Component } from "react";
import { Link} from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as authSelectors from "../redux/auth/selectors";
import * as layoutSelectors from "../redux/layout/selectors";
import * as layoutActions from "../redux/layout/actions";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleLinkClose = this.handleLinkClose.bind(this);
  }

  handleClose(event) {
    this.props.closeSidebar();
    event.preventDefault();
    return false;
  }

  handleLinkClose() {
    this.props.closeSidebar();
  }

  getClass() {
    if (this.props.isSidebarActive) {
      return "sidebar show";
    } else {
      return "sidebar hide";
    }
  }

  render() {
    return (
      <div className={this.getClass()}>
        <div
          className="bs-canvas-overlay show bs-canvas-anim bg-dark position-fixed w-100 h-100"
          onClick={this.handleClose}
        ></div>
        <div className="bs-canvas bs-canvas-anim position-fixed bg-light h-100">
          <header className="bs-canvas-header p-3 bg-primary overflow-auto">
            <button
              type="button"
              className="bs-canvas-close float-left close"
              aria-label="Close"
              onClick={this.handleClose}
            >
              <span aria-hidden="true" className="text-light">
                &times;
              </span>
            </button>
            <h4 className="d-inline-block text-light mb-0 float-right">
              Account
            </h4>
          </header>
          <div className="bs-canvas-content px-3 py-5">
            <Link to="/user" onClick={this.handleLinkClose}>My Account</Link>
          </div>
          {this.props.isManager && (
            <div className="bs-canvas-content px-3 py-5">
              <Link to="/hotels" onClick={this.handleLinkClose}>My Hotels</Link>
            </div>
          )}
          <div className="bs-canvas-content px-3 py-5">
            <Link to="/reservation" onClick={this.handleLinkClose}>Reservation overview</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapSelectors = (store) => ({
  isSidebarActive: layoutSelectors.isSidebarActive(store),
  isManager: authSelectors.getUserData(store).isManager
});

export default connect(mapSelectors, { ...layoutActions })(withRouter(Sidebar));
