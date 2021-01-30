import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin(event) {
        this.props.history.push('/login');
        event.preventDefault();
        return false;
    }

    handleRegister(event) {
        this.props.history.push('/register');
        event.preventDefault();
        return false;
    }

    render() {
        return (
            <div className="bg-dark py-5">
                <div className="d-flex container">
                    <div className="row col-sm align-self-center">
                        <h3 className="text-white">Hotelreservationsystem</h3>
                    </div>
                    <div className="row col-sm align-self-center justify-content-end">
                        {
                            this.state.isLoggedIn && (
                                <button className="btn btn-primary" type="button" data-toggle="canvas" data-target="#bs-canvas-right"
                                aria-expanded="false" aria-controls="bs-canvas-right">&#9776; Account</button>
                            )
                        }
                        {
                            !this.state.isLoggedIn && (
                                <div>
                                    <button onClick={this.handleLogin} type="button" class="btn btn-primary">Login</button>
                                    <button onClick={this.handleRegister} type="button" class="btn btn-success ml-2">Register</button>
                                </div>
                            )
                        }
                    </div>
                    <hr />
                </div>
            </div>
        );
    }
}

export default withRouter(Navbar);