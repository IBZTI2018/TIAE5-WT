import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as actions from '../redux/auth/actions';

class UserSettingsPage extends Component {

  componentDidMount() {
    const { loadCurrentUser } =  this.props;

    loadCurrentUser();
  }

  render() {
    return (
      <div>
        <h2>My Account</h2>
      </div>
    );
  }
}

export default connect(null, { ...actions })(withRouter(UserSettingsPage));