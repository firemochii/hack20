import React, { Component } from "react";

import NavBar from "./Navbar";
import MainContent from "./MainContent";

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <MainContent />
      </div>
    );
  }
}
