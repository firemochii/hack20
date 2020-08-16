import React, { Component } from "react";
import { auth } from "./services/firebase";
import { db } from "./services/firebase";
import NavBar from "./Navbar";

export default class Chat extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
    	user: auth().currentUser,
    	room: '',
		chats: [],
		content: '',
		readError: null,
		writeError: null,
		loadingChats: false
	  };
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.myRef = React.createRef();
    }

    async componentDidMount() {
        this.setState({ readError: null });
        try {
          db.ref("chats").on("value", snapshot => {
            let chats = [];
            snapshot.forEach((snap) => {
              chats.push(snap.val());
            });
            this.setState({ chats });
          });
        } catch (error) {
          this.setState({ readError: error.message });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
          await db.ref("chats").push({
            content: this.state.content,
            timestamp: Date.now(),
            uid: this.state.user.uid
          });
          this.setState({ content: '' });
        } catch (error) {
          this.setState({ writeError: error.message });
        }
    }

    handleChange(event) {
        this.setState({
          content: event.target.value
        });
    }

    render() {
        return (
            <div>
            
              <NavBar />       
              <div class="row chatpage">
                <div class="column col1">
                  <h1>Resources</h1>
                    <ul>
                      <li>
                        <div>
                                <a href="url">UW Mental Health</a>
                                <p>some info about uw mental health</p>
                        </div>
                      </li>
                      <li>
                        <div>
                            <a href="url">Let's Talk</a>
                            <p>some info about uw let's talk</p>
                        </div>
                      </li>
                      <li>
                            <div>
                                <a href="url">Other Resource</a>
                                <p>some info about this other resource</p>
                            </div>
                      </li>
                    </ul>
                </div>
              <div class="column col-8">
              <div className="chats container">
                {this.state.chats.map(chat => {
                  return <p className="container" key={chat.timestamp}>{chat.content}</p>
                })}
              </div>
              <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={this.state.content}></input>
                {this.state.error ? <p>{this.state.writeError}</p> : null}
                <button type="submit">Send</button>
              </form>
              <div>
                Login in as: <strong>{this.state.user.email}</strong>
              </div>
            </div>
            </div>
            </div>
          );
      }
}