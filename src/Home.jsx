import React, { Component } from 'react';
import idle from './Assets/img/Idle.gif';
import './App.css';
import './BENstrap-in/css/my.css';

class Dashboard extends Component {
    render() {
        return (
            <div className="row">
                <div className="flex-1" style={{ background: `url(${idle}) center/auto no-repeat`, border:"1px solid #000" }}></div>
                <span className="flex-9">
                    <h1>HollowSaiyan</h1>
                    <p>Level: 1</p>
                    <p>Experience: 0/10</p>
                </span>
                <button type="button" className="goal">Create Goal</button>
            </div>
        );
    }
}
const Goal = ({nameOfGoal}) => {
    return (
      <div className="goal fnt-white">
        <div>
            <p>Goal {nameOfGoal} </p>
        </div>
      </div>
    );
}
const GoalList = (props) => {
    var goals = [];
    for(let i = 0; i < props.goals; i++){
        goals.push(<Goal key={i} nameOfGoal={i}/>);
    }
    return(
        <div className="column" id="goalList">
            {goals}
        </div>
    );
}
class Home extends Component {
    state = {
        goals: 22
    };
    render() {
        return (
            <div className="App-intro">
                <Dashboard/>
                <GoalList goals={this.state.goals}/>
            </div>
        );
    }
}
  
export default Home;