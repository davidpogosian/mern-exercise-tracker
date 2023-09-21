import React, { Component } from 'react';
import axios from 'axios'

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        // something to do with making "this" refer to right class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        };
    }

    onChangeUsername(e) {
        /* never do
        this.state.username = "beau";
        */
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault(); // prevent usual html form behavior

        const user = {
            username: this.state.username
        };

        console.log(user)
        // this is where data gets submitted to db
        axios.post('http://172.24.29.210:5000/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        });
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}