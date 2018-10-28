import React, { Component } from 'react';
import '../css/fogg-model.css';
import foggModel from '../Assets/img/fogg-model.png';
// var BigPicture = require('bigpicture');
import BigPicture from 'bigpicture';
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
  viewMedia = (e) => {
    if(e.target.classList[0] === 'vid')
      BigPicture({ el: e.target, ytSrc: e.target.getAttribute('ytsrc') })
    else
      BigPicture({ el: e.target, imgSrc: e.target.getAttribute('imgsrc') })
  }
  render() {
    return (
      <div className={`App-intro${this.props.appState.theme} Model pad-top-1`}>
        <div className="column">
          <h2>B=MAP</h2>
          <img id="imgModel" className="img" src={foggModel} imgsrc={`${foggModel}`} onClick={this.viewMedia} alt="https://www.behaviormodel.org/index_files/fogg-behavior-model-updated.png"/>
          <p id="foggDescription">
            'B=MAP' is a simple equation! 'B' is the Behavior that can be changed or added. All 3 factors must be present for this to work.
          </p>
          <label className="margn-top-2">Watch these quick info videos about the model from Dr. Fogg himself!</label>
          <div className="row">
            <div className="vid" onClick={this.viewMedia} ytsrc="jsbF9z6adAo" 
              style={{backgroundImage: 'url(https://i.ytimg.com/vi/jsbF9z6adAo/mqdefault.jpg)'}}></div>
            <div className="vid" onClick={this.viewMedia} ytsrc="7LJW-kYNo7k" 
              style={{backgroundImage: 'url(https://i.ytimg.com/vi/7LJW-kYNo7k/mqdefault.jpg)'}}></div>
          </div>
        </div>
        <div className="column">
          <button className="accordion" onClick={this.toggle}>(M) Motivation</button>
          <span className="panel">
            <p>serves as the primary driver to persuade and prompt a desired reaction.</p>
          </span>
          <button className="accordion" onClick={this.toggle}>(A) Ability</button>
          <span className="panel">
            <p>determines whether a person can do something.</p> 
          </span>
          <button className="accordion" onClick={this.toggle}>(P) Prompt a.k.a Trigger</button>
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