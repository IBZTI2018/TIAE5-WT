import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as authSelectors from "../redux/auth/selectors";
import * as authActions from "../redux/auth/actions";
import * as layoutActions from "../redux/layout/actions";
import * as toast from "../toast";
import layout from "../redux/layout";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleAccount = this.handleAccount.bind(this);
  }

  handleLogout(event) {
    const { unauthenticateUser } = this.props;
    unauthenticateUser();
    toast.success("Successfully logged out!");
    this.props.history.push({ pathname: "/" });
  }

  handleLogin(event) {
    this.props.history.push("/login");
    event.preventDefault();
    return false;
  }

  handleRegister(event) {
    this.props.history.push("/register");
    event.preventDefault();
    return false;
  }

  handleAccount(event) {
    this.props.openSidebar();
    event.preventDefault();
    return false;
  }

  render() {
    return (
      <div className="bg-dark py-5">
        <div className="d-flex container">
          <div className="row col-sm align-self-center">
            <h3 className="text-white">
              <a href="/">BookYourStayToday</a>
            </h3>
          </div>
          <div className="row col-sm align-self-center justify-content-end">
            {this.props.isLoggedIn && (
              <div>
                <span className="user-email">
                  <i className="fa fa-user"></i> {this.props.user.firstname}{" "}
                  {this.props.user.lastname} &lt;{this.props.user.email}&gt;
                </span>
                <button
                  onClick={this.handleAccount}
                  type="button"
                  className="btn btn-primary"
                >
                  &#9776; Account
                </button>
                <button
                  onClick={this.handleLogout}
                  type="button"
                  className="btn btn-warning ml-2"
                >
                  Logout
                </button>
              </div>
            )}
            {!this.props.isLoggedIn && (
              <div>
                <button
                  onClick={this.handleLogin}
                  type="button"
                  className="btn btn-primary"
                >
                  Login
                </button>
                <button
                  onClick={this.handleRegister}
                  type="button"
                  className="btn btn-success ml-2"
                >
                  Register
                </button>
              </div>
            )}
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

const mapSelectors = (store) => ({
  isLoggedIn: authSelectors.isLoggedIn(store),
  user: authSelectors.getUserData(store),
});

export default connect(mapSelectors, { ...authActions, ...layoutActions })(
  withRouter(Navbar)
);
