import React, { Component } from 'react';
import '../css/fogg-model.css';
import foggModel from '../Assets/img/fogg-model.png';
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
      <div className={`App-intro${this.props.appState.theme} Model pad-top-1`}>
        <h2>B=MAP</h2>
        <div className="column hght-100">
          <img id="imgModel" src={foggModel} alt="https://www.behaviormodel.org/index_files/fogg-behavior-model-updated.png"/>
          <p id="foggDescription">
            'B=MAP' is a simple equation! 'B' is the Behavior that can be changed or added. All 3 factors must be present for this to work.
          </p>
          <button className="accordion" onClick={this.toggle}>Motivation</button>
          <span className="panel">
            <p>serves as the primary driver to persuade and prompt a desired reaction.</p>
          </span>
          <button className="accordion" onClick={this.toggle}>Ability</button>
          <span className="panel">
            <p>determines whether a person can do something.</p> 
          </span>
          <button className="accordion" onClick={this.toggle}>Prompt</button>
          <span className="panel">
            <p>is a cue or reminder to spring into action!</p>
          </span>
        </div>
        {/* <h5>Thank you Dr. BJ Fogg!</h5> */}
      </div>
    );
  }
}

export default Model;