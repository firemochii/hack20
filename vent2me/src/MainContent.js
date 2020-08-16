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
      isSubmitted: false,
      foundPartner: false,
      roomId: ''
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
    this.setState({isSubmitted: true});

    // add to queue
    /*
    let queue = new Set();
    db.ref("queue").on("value", snapshot => {
      snapshot.forEach((snap) => {
        queue.add(snap.val());
      }
    }
    if queue.has()
    */
    console.log(this.state.selectedButtons)
    await db.ref("chats/queue").push({
      uid: this.state.user.uid,
      struggles: Array.from(this.state.selectedButtons)
    })

    // check if room created


    // redirect to room
    this.setState({foundPartner: true});
  }

  render() {
    let storedOptions = [];
    for (let i = 0; i < options.length; i++) {
      storedOptions.push(<ButtonOption
        removeFromSelectedButtons={this.removeFromSelectedButtons}
        addToSelectedButtons={this.addToSelectedButtons}
        name={options[i]}/>)
    }
  if (this.state.foundPartner) {
    return <Redirect to={{
      pathname: '/chat',
      state: { roomId: this.state.roomId }
  }} />;
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
                  <button className="btn btn-primary" type="submit" disabled={this.state.isSubmitted}>
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
/* -- Creates room --

    try {
      let room = await db.ref("chats").push({
        users: [auth().currentUser.uid],
        messages: null
      });
      this.setState({
        roomId: room.key,
      });
    } catch (error) {
     console.log(error);
    }
*/