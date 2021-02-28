import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as authActions from "../redux/auth/actions";
import * as layoutActions from "../redux/layout/actions";
import * as toast from "../toast";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usermail: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { authenticateUser } = this.props;
    authenticateUser(this.state.usermail, this.state.password)
      .then(() => {
        // toast.success("Successfully logged in!");
        // this.props.history.push({ pathname: "/" });
        // setTimeout(() => this.props.openSidebar(), 0);

        // Force-reload for now since JSONAPI library cannot take a
        // function to get the auth token so it is set on load
        window.location.reload()
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login failed, please check your credentials!");
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                {" "}
                <i className="fa fa-envelope"></i>{" "}
              </span>
            </div>
            <input
              name="usermail"
              value={this.state.usermail}
              onChange={this.handleChange}
              className="form-control"
              placeholder="E-Mail"
              type="email"
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                {" "}
                <i className="fa fa-lock"></i>{" "}
              </span>
            </div>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Passwort"
              type="password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { ...authActions, ...layoutActions })(
  withRouter(LoginForm)
);
