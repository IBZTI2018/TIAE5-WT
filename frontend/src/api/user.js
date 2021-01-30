import $ from 'jquery';
import React, { Component } from "react";

class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="mt-5">
                <h3>Userprofile of <b>{ this.props.data.attributes.firstname } { this.props.data.attributes.lastname } </b></h3>
                <hr />
                <table>
                    <tr>
                        <td>Date of registration</td> 
                        <td>Title </td>
                        <td>Billing address</td>
                        <td>delivery address</td>
                    </tr>
                    <tr>
                        <td>{ this.props.data.attributes.reg_date }</td>
                        <td>{ this.props.data.links.title_id }</td>
                        <td>{ this.props.data.links.billing_address_id }</td>
                        <td>{ this.props.data.links.contact_address_id }</td>
                    </tr>
                </table>
            </section>
        );
    }
}

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        this.getUsers();
    }

    async getUsers() {
        $.ajax({
            url: 'http://localhost:8001/users',
            success: (users) => {
                this.setState({
                    users: users.data
                }); // Destructuring Dictionary
            }
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.users.map(user => (
                        <User data={user} />
                    ))
                }
            </div>
        );
    }
}

export { Users };