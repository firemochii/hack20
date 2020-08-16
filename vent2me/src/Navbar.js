import React, { Component } from "react";

export default class NavBar extends Component {
  handleSignOut = () => {
    this.props.handleSignOut();
  }

  render() {
    return (
      <nav className="nav navbar navbar-expand bg-white">
        <span className="navbar-brand">
          <span className="logo" aria-hidden="true"></span>
          <span>Open Bar</span>
        </span>
        <div className="nav-links">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                CHAT HISTORY
              </a>
            </li>
            <li className="nav-item">
              <span className="nav-link divider" href="#">
                |
              </span>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.handleSignOut}>
                SIGN OUT
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
