import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  state = {
    username: '',
    password_digest: '',
    fireRedirect: false,
    user: {},
  };

  handleInputChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  handleFormSubmit = async event => {
    event.preventDefault();
    let data = { username: this.state.username, password: this.state.password_digest };
    try {
      const res = await axios({ method: 'POST', url: `/auth/login`, data });
      this.props.userDataForState(res);
      if (res.data.auth) this.setState({ user: res, fireRedirect: true });
      else {
        alert('Inccorect username or password!');
        event.target.reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  render = () => {
    const { password_digest, fireRedirect, username, user:{data:{user:{id}}} } = this.state;
    return (
      <div className="login-register">
        <div className="top">
          <img className="profile-icon" alt="radio" src="https://d30y9cdsu7xlg0.cloudfront.net/png/898318-200.png" />
          <h3>Login</h3>
        </div>

        <div className="form">
          <form onSubmit={event => this.handleFormSubmit(event)}>
            <input type="text" placeholder="Username" name="username" value={username} onChange={event => this.handleInputChange(event)} />
            <input type="password" placeholder="Password" name="password_digest" minLength="6" required value={password_digest} onChange={event => this.handleInputChange(event)} />
            <input className="submit" type="submit" value="Log In" />
          </form>
          {fireRedirect ? <Redirect push to={`/profile/${id}`} /> : ''}
        </div>
        <p>
          <Link to={`/auth/register`}>Don't have an account? Register here!</Link>
        </p>
      </div>
    );
  };
}

export default Login;
