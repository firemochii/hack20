import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "./services/firebase";
import { db } from "./services/firebase";
import ButtonOption from './ButtonOption'
import { options } from './config.js'

export default class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedButtons: new Set(),
      user: auth().currentUser,
      isSubmitted: false
    }
  }

  removeFromSelectedButtons = (name) => {
    this.setState({
      selectButtons: this.state.selectedButtons.delete(name)
    })
  }

  addToSelectedButtons = (name) => {
    this.setState({
      selectButtons: this.state.selectedButtons.add(name)
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await db.ref("chats").push({
        users: [auth().currentUser.uid],
        messages: null
      });
      this.setState({isSubmitted: true});
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let storedOptions = [];
    for (let i = 0; i < options.length; i++) {
      storedOptions.push(<ButtonOption
        removeFromSelectedButtons={this.removeFromSelectedButtons}
        addToSelectedButtons={this.addToSelectedButtons}
        name={options[i]}/>)
    }
  if (this.state.isSubmitted) {
    return <Redirect to='/chat' />;
  } else {
    return (
      <main className="main-content">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 id="prompt">What are you struggling with?</h2>
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row form-group">
                {storedOptions}
              </div>
              <div className="row form-group">
                <div className="col d-flex flex-column align-items-center">
                  <h3>Optional</h3>
                  <div className="form-check form-check-inline">
                    <span id="optional">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="card1"
                      ></input>
                      <label className="form-check-label" for="card1">
                        Voice
                      </label>
                    </span>
                    <span id="optional">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="card2"
                      ></input>
                      <label className="form-check-label" for="card2">
                        Video
                      </label>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <button className="btn btn-primary" type="submit">
                    Find a partner!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
    )
  }
  }
}