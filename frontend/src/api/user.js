import $ from 'jquery';
import React, { Component } from "react";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        }
    }

    render() {
        console.log(this.state.user);
        return (
            <section class="mt-5">
                <h3>Benutzerprofil von <b>{ this.state.user.attributes.firstname } { this.state.user.attributes.lastname } </b></h3>
                <hr />
                <table>
                    <tr>
                        <td>Registrierungsdatum</td> 
                        <td>Anrede</td>
                        <td>Rechnungsadresse</td>
                        <td>Lieferadresse</td>
                    </tr>
                    <tr>
                        <td>{ this.state.user.attributes.reg_date }</td>
                        <td>{ this.state.user.links.title_id }</td>
                        <td>{ this.state.user.links.billing_address_id }</td>
                        <td>{ this.state.user.links.contact_address_id }</td>
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
                        <User key={user.id} user={user} />
                    ))
                }
            </div>
        );
    }
}

export { Users };