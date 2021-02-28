import React, { Component } from "react";

class ThankYouPage extends Component {
  render() {
    return (
      <div className="jumbotron text-center">
        <h1 className="display-3">Thank You!</h1>
        <p className="lead">
          <strong>Please check your email</strong> for further instructions on
          how to check in at your hotel.
        </p>
        <hr />
        <p>
          Having trouble? <a href="mailto:contact@book-your-stay-today.com">Contact us</a>
        </p>
        <p className="lead">
          <a
            className="btn btn-primary btn-sm"
            href="/"
            role="button"
          >
            Continue to homepage
          </a>
        </p>
      </div>
    );
  }
}

export default ThankYouPage;
