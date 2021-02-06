import React, { Component } from 'react';
import AccountForm from '../components/account/AccountForm';
import AddressCard from '../components/account/AddressCard';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as actions from '../redux/auth/actions';
import * as selectors from '../redux/auth/selectors';

class UserSettingsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addressDataLoaded: false
    };
  }

  componentDidMount() {
    const { loadCurrentUser } =  this.props;

    loadCurrentUser().then(() => this.setState({addressDataLoaded: true}));
  }

  render() {
    return (
      <div>
        <h2>My Account</h2>
        <div className="row">
          <div className="col-md-8">
            <AccountForm user={this.props.user}/>
          </div>
          <div className="col-md-4">
            { this.state.addressDataLoaded &&
              <div>
                <div>
                  <AddressCard
                    user={this.props.user}
                    addressName="Contact Address"
                    addressKey="contact_address"
                  />
                </div>

                <div className="mt-3">
                  <AddressCard
                    user={this.props.user}
                    addressName="Billing Address"
                    addressKey="billing_address"
                    addressKeyAlt="contact_address"
                  />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapSelectors = (store) => ({
  user: selectors.getUserSelf(store)
})

export default connect(mapSelectors, { ...actions })(withRouter(UserSettingsPage));