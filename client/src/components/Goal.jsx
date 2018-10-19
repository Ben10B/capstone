import React, { Component } from 'react';
import Calendar from './Calendar';
import '../css/goal.css';

export default class Goal extends Component {
  componentDidMount(){
    var progressbar = document.getElementById("progressbar");   
    var pbar_width = 1;
    var currentHealth = (this.props.selectedGoal.health / this.props.selectedGoal.maxHealth) * 100;
    var id = setInterval(frame, 5);
    function frame() {
      if (pbar_width >= currentHealth) {
        clearInterval(id);
      } else {
        pbar_width++; 
        progressbar.style.width = pbar_width + '%'; 
      }
    }
  }
  render() {
      return (
        <div className={`App-intro${this.props.appState.theme}`}>
          <div className="row flex-1">
            <span>
                <h1>{this.props.selectedGoal.title}</h1>
            </span>
            <button type="button" className="btn1" onClick={()=>this.props.click('')}>Back to Dashboard</button>
          </div>
          <ProgressBar progress={this.props.selectedGoal}/>
          <Calendar selectedGoal={this.props.selectedGoal}/>
        </div>
      )
  }
}

const ProgressBar = ({progress}) => {
  return (
    <div className="progressbar-container">
      <div id="progressbar" className="">{progress.health}/{progress.maxHealth}</div>
    </div>
  )
}