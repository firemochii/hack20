import React, { Component } from "react";

export default class ButtonOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false
    }
  }

  toggleClick = () => {
    this.setState({
      isClicked: !this.state.isClicked
    })

    if (!this.state.isClicked) {
      this.props.addToSelectedButtons(this.props.name);
    } else {
      this.props.removeFromSelectedButtons(this.props.name);
    }
  }

  render() {
    let isActive;
    if (this.state.isClicked) {
      isActive = "btn btn-primary active";
      
    } else {
      isActive = "btn btn-outline-primary";
    }

    return (
      <div className="col-xs-12 col-md-6 col-lg-4 py-2">
        <div className="card">
          <button 
            onClick={this.toggleClick}
            type="button"
            className={isActive}
            value="problem"
          >
            <div className="card-body">
              <h3>{this.props.name}</h3>
            </div>
          </button>
        </div>
      </div>
    );
  }
}
