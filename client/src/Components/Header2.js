import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';

import axios from 'axios';

class Header2 extends Component {
  state = {
    user: {},
    dataLoaded: false,
  };
  componentDidMount = () => this.setState({user: this.props.user,dataLoaded: true});
  logOut = async () => {
    try {
      const res = await axios({ method: 'GET', url: `/auth/logout` });
      if (res.data.loggedOut) {
        this.props.loggedOut();
        <Redirect push to={'/'} />;
      }
    }
    catch (err) { console.log(err) };
  };

  logOut = async () => {
    try {
      const res = await axios({ method: 'GET', url: `/auth/logout` });
      if (res.data.loggedOut) {
        this.props.loggedOut();
        <Redirect push to={'/'} />;
      };
    }
    catch (err) { console.log(err) };
  };

  renderAccountLink = () => (
    <Link to={`/profile/${this.props.user.id}`} className="nav-button"> Account{' '} </Link>
  );

  render = () => {
    return (
      <div className="nav">
        <div className="lock-up">
          <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/1041163-200.png" alt="" />
          <Link to={`/`}>
            {' '}
            <h4>soundland</h4>{' '}
          </Link>
        </div>
        <div className="nav-buttons-align">
          {this.state.dataLoaded
            ? this.renderAccountLink()
            : ' '}
          <Link
            onClick={this.logOut}
            to={'/'}
            className="nav-button"
          >
            Log Out
          </Link>
          <Link
            to={'/list'}
            className="nav-button"
          >
            Events
          </Link>
        </div>
      </div>
    );
  };
}

export default Header2;
