import React, { Component } from "react";

class ThankYouPage extends Component {
  render() {
    return (
      <div class="jumbotron text-center">
        <h1 class="display-3">Thank You!</h1>
        <p class="lead">
          <strong>Please check your email</strong> for further instructions on
          how to check in at your hotel.
        </p>
        <hr />
        <p>
          Having trouble? <a href="mailto:contact@book-your-stay-today.com">Contact us</a>
        </p>
        <p class="lead">
          <a
            class="btn btn-primary btn-sm"
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
