import React, { Component } from 'react';
import '../css/fogg-model.css';
class Model extends Component {
  toggle = (e) => {
    let acc = e.target;
    let panel = acc.nextElementSibling;
    acc.classList.toggle("activeACC");
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }
  render() {
    return (
      <div className={`App-intro${this.props.appState.theme} pad-top-1`}>
        {/* <h1>Model</h1> */}
          <h5>Thank you Dr. BJ Fogg!</h5>
        <div className="column">
          <p></p>
          <button className="accordion" onClick={this.toggle}>Motivation</button>
          <span className="panel">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </span>
          <button className="accordion" onClick={this.toggle}>Ability</button>
          <span className="panel">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </span>
          <button className="accordion" onClick={this.toggle}>Trigger</button>
          <span className="panel">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </span>
        </div>
      </div>
    );
  }
}

export default Model;