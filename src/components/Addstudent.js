// import React from 'react';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SERVER_URL} from '../constants.js'
import { TextField } from '@mui/material';


import { withRouter } from 'react-router-dom';

class addStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      stateCode: '0',
    };
  }

  //Handles changes in the fields as they are being typed
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //Handels the submission of the data from the Form element
  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, stateCode } = this.state;
    try {
      await fetch(`${SERVER_URL}/assignment/add/${name}/${email}/${stateCode}`, {
        method: 'POST',
      });
      this.props.history.push('/');
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  //Renders web page
  render() {
    const { name, email, stateCode } = this.state;

    return (
      <div>
        <h2>Create New Assignment</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            required
          />
          <br />
          <label htmlFor="stateCode">Status code:</label>
          <input
            type="number"
            id="stateCode"
            name="stateCode"
            value={stateCode}
            onChange={this.handleChange}
            required
          />
          <br />
          <button type="submit">Create Assignment</button>
        </form>
      </div>
    );
  }
}

export default withRouter(addStudent);
