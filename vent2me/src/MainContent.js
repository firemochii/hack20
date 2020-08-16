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
      roomId: undefined
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
    let queue = [];
    try {
      db.ref("chats/queue").on("value", async (snapshot) => {
        snapshot.forEach((snap) => {
          queue.push(snap.val());
        });
        for (let i = 0; i < queue.length; i++) {
          for (let j = 0; j < queue[i].struggles.length; j++) {
              if (this.state.selectedButtons.has(queue[i].struggles[j]) && queue[i].uid !== this.state.user.uid) {
              db.ref("chats/queue/" + queue[i].uid).remove();
              this.createRoom(this.state.user, queue[i].uid);
              this.setState({roomId: queue[i].uid});
              break;
            }
          }
        }
        var hasRoom = false;
        var uid = this.state.user.uid;
        await db.ref("chats").once("value").then(function(snapshot) {
          if (snapshot.hasChild(uid)) {
            hasRoom = true;
          }
        });
        if (hasRoom) {
          this.setState({roomId: this.state.user.uid})
        }
      })
    } catch (err) {
      console.log(err) // leave it
    }

    // add to queue
    let json = {};
    json[this.state.user.uid] = {struggles: Array.from(this.state.selectedButtons), uid: this.state.user.uid};
    await db.ref("chats/queue").set(json);
  }

  createRoom = async (user, otherUser) => {
    try {
      let json = {};
      json[otherUser] = {users: [user.uid, otherUser], messages: null};
      await db.ref("chats").set(json);
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
  if (this.state.roomId) {
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
                  <button className="btn btn-primary" type="submit" disabled={this.state.isSubmitted || this.state.selectedButtons.size == 0}>
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