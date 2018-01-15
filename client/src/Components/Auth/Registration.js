import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class Registration extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    password_digest: '',
    password_confirm: '',
    fireRedirect: false,
  };
  componentDidMount = () => console.log(this.state);

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async event => {
    event.preventDefault();
    const { password_digest, password_confirm, email, username, name } = this.state;
    if (password_digest != password_confirm) {
      alert('Passwords do not match..');
      return this.setState({ password_digest: '', password_confirm: '' });
    }
    const data = { name, username, email, password_digest };
    try {
      const res = await axios({ method: 'POST', url: `/auth/register`, data });
      this.props.userDataForState(res);
      this.setState({ newID: res.data.id, fireRedirect: true })
    }
    catch (err) {
      console.log(err);
      event.target.reset();
    }
  };

  render = () => {
    const { name, username, email, password_digest, password_confirm, fireRedirect } = this.state;
    return (
      <div className="login-register">
        <div className="top">
          <img
            className="profile-icon"
            alt="radio"
            src="https://d30y9cdsu7xlg0.cloudfront.net/png/898318-200.png"
          />
          <h3>Register</h3>
        </div>

        <div className="form">
          <form onSubmit={event => this.handleFormSubmit(event)} >
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={event => this.handleInputChange(event)}
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={event => this.handleInputChange(event)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={event => this.handleInputChange(event)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password_digest"
              minLength="6"
              required
              value={password_digest}
              onChange={event => this.handleInputChange(event)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="password_confirm"
              minLength="6"
              required
              value={password_confirm}
              onChange={event => this.handleInputChange(event)}
            />
            <input
              type="submit"
              value="Register"
            />
          </form>
          {fireRedirect ? <Redirect push to={`/`} /> : ('')}
        </div>
        <Link
          to={`/auth/login`}>
          Already registered? Log in here!
        </Link>
      </div>
    );
  };
}

export default Registration;
