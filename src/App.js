import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './compnents/layout/Navbar';
import Users from './compnents/users/Users';
import User from './compnents/users/User';
import axios from 'axios';
import Search from './compnents/users/Search';
import Alert from './compnents/layout/Alert';
import About from './compnents/pages/About';

class App extends Component {
  state = {
    users: [],
    loading: false,
    user: {},
    alert: null,
    repos: []
  };

  //Search USers
  searchUsers = async text => {
    this.setState({ loading: true });
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: response.data.items, loading: false });
  };

  //Get single github user
  getUser = async username => {
    this.setState({ loading: true });
    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: response.data, loading: false });
  };

  //Get Users Repos
  getUserRepos = async username => {
    this.setState({ loading: true });
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ repos: response.data, loading: false });
  };

  //Clear Users from state
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users
                      loading={this.state.loading}
                      users={this.state.users}
                    />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={this.state.user}
                    loading={this.state.loading}
                    repos={this.state.repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
