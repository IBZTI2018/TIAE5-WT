import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { withRouter } from 'react-router';

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.history.push('/');
        e.preventDefault();
    }

    render() {
        return (
            <div className="container py-2">
                <BrowserRouter>
                    {
                        this.props.location.pathname != '/' && (
                            <a href="#" onClick={this.handleClick}>&larr; Back to Start</a>
                        )
                    }
                </BrowserRouter>
            </div>
        );
    }
}

export default withRouter(Breadcrumbs);