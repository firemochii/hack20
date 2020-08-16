import React, { Component } from "react";

import firebase from 'firebase'
import NavBar from "./Navbar";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
//import Home from './Home';
import Chat from './Chat';
import Signup from './Signup';
import Login from './Login';
import MainContent from './MainContent'
import { auth } from './services/firebase';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  }

  handleSignOut = () => {
    firebase.auth().signOut()
  }

  render() {
    return this.state.loading === true ? <h2>Loading...</h2> : (

    <div>
      <NavBar handleSignOut={this.handleSignOut}/>
      <Router>
        <Switch>
          <PublicRoute path="/"></PublicRoute>
          <PrivateRoute path="/chat" authenticated={this.state.authenticated} component={Chat}></PrivateRoute>
          <PrivateRoute path="/maincontent" authenticated={this.state.authenticated} component={MainContent}></PrivateRoute>
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}></PublicRoute>
          <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login}></PublicRoute>
          <Redirect to="/login" /> {/* Default Page*/}
        </Switch>
      </Router>

      </div>
    );
  }
}

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/maincontent' />}
    />
  )
}