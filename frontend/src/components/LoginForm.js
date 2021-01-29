import React, { Component } from 'react';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      usermail: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post('/api/complex/signin', {
      usermail: this.state.usermail,
      password: this.state.password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
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
              <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
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
              <button type="submit" className="btn btn-primary btn-block">Einloggen</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;