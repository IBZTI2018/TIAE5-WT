import React, { Component } from 'react';
import UserSettingsPage from './UserSettingsPage';
import UserAddressPage from './UserAddressPage';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as actions from '../redux/auth/actions';
import * as selectors from '../redux/auth/selectors';
import { Switch, Route, Redirect } from "react-router-dom";

class UserPage extends Component {

  componentDidMount() {
    const { loadCurrentUser } =  this.props;

    loadCurrentUser();
  }

  render() {
    return (
      <Switch>
        <Route path={`${this.props.match.path}/settings`}>
          <UserSettingsPage />
        </Route>
        <Route path={`${this.props.match.path}/address/:addressType`}>
          <UserAddressPage />
        </Route>
        <Route path={`${this.props.match.path}`}>
          <Redirect to={`${this.props.match.path}/settings`} />
        </Route>
      </Switch>
    );
  }
}

const mapSelectors = (store) => ({
  user: selectors.getUserSelf(store)
})

export default connect(mapSelectors, { ...actions })(withRouter(UserPage));