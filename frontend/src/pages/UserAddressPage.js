import React, { Component } from 'react';
import AddressForm from '../components/account/AddressForm';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import * as actions from '../redux/auth/actions';
import * as selectors from '../redux/auth/selectors';

class UserAddressPage extends Component {
  constructor(props) {
    super(props);

    const addressType = props.match.params.addressType;
    const addressNames = {
      contact_address: "Contact Address",
      billing_address: "Billing Address"
    }

    this.state = {
      addressName: addressNames[addressType]
    }
  }

  componentDidMount() {
    const { loadCurrentUser } =  this.props;

    loadCurrentUser();
  }

  render() {
    return (
      <div>
        <h2>My {this.state.addressName}</h2>
        <div className="row">
          <div className="col">
            <AddressForm user={this.props.user}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapSelectors = (store) => ({
  user: selectors.getUserSelf(store)
})

export default connect(mapSelectors, { ...actions })(withRouter(UserAddressPage));