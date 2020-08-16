import React, { Component } from "react";

import NavBar from "./Navbar";

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <main className="main-content">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 id="prompt">What are you struggling with?</h2>
              </div>
            </div>
            <form>
              <div className="row form-group">
                <div className="col-xs-12 col-md-6 col-lg-4 py-2">
                  <div className="card">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      value="problem"
                    >
                      <div className="card-body">
                        <h3>Problem</h3>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-4 py-2">
                  <div className="card">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      value="problem"
                    >
                      <div className="card-body">
                        <h3>Problem</h3>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-4 py-2">
                  <div className="card">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      value="problem"
                    >
                      <div className="card-body">
                        <h3>Problem</h3>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-4 py-2">
                  <div className="card">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      value="problem"
                    >
                      <div className="card-body">
                        <h3>Problem</h3>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-4 py-2">
                  <div className="card">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      value="problem"
                    >
                      <div className="card-body">
                        <h3>Problem</h3>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-4 py-2">
                  <div className="card">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      value="problem"
                    >
                      <div className="card-body">
                        <h3>Problem</h3>
                      </div>
                    </button>
                  </div>
                </div>
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
      </div>
    );
  }
}
