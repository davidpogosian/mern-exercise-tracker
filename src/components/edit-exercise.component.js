import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

//import { useParams} from 'react-router-dom';

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        // something to do with making "this" refer to right class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            data: new Date(),
            users: []
        };
    }

    // single user hardcoded
    // react life cycle method (react calls right before anything displays on the page)
    // componentDidMount() {
    //     // get the exercise we are editing from db
    //     axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
    //         .then(response => {
    //             this.setState({
    //             username: response.data.username,
    //             description: response.data.description,
    //             duration: response.data.duration,
    //             date: new Date(response.data.date)
    //             })   
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })

    //     // why need this? Oh it's getting all the user options
    //     axios.get('http://172.24.29.210:5000/users/')
    //         .then(response => {
    //             if (response.data.length > 0) {
    //                 this.setState({
    //                     users: response.data.map(user => user.username)
    //                 })
    //             }
    //         });
    // }

    componentDidMount() {
        //console.log(useParams())
        axios.get('http://172.24.29.210:5000/exercises/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              username: response.data.username,
              description: response.data.description,
              duration: response.data.duration,
              date: new Date(response.data.date)
            })   
          })
          .catch(function (error) {
            console.log(error);
          })
    
        axios.get('http://172.24.29.210:5000/users/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data.map(user => user.username),
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }

    onChangeUsername(e) {
        /* never do
        this.state.username = "beau";
        */
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault(); // prevent usual html form behavior

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        };

        console.log(exercise)
        // this is where data gets submitted to db
        axios.post('http://172.24.29.210:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = "/" // take user back to homepage
    }

    // form to add exercise
    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Username: </label>
                    <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(function(user) {
                            return <option 
                                key={user}
                                value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                    </div>
                    <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}