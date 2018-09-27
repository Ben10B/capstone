import React, { Component } from 'react';
// import idleM from './Assets/img/Idle-Male.gif';
// import powerUpM from './Assets/img/PowerUp-Male.gif';
import powerUpF from './Assets/img/PowerUp-Female.gif';
import idleF from './Assets/img/Idle-Female.gif';
import './App.css';
import './BENstrap-in/css/my.css';
import Calendar from './Calendar.jsx';

class Dashboard extends Component {
    zoomOut = () => { document.getElementById('dashImg').style.backgroundSize = `auto`; };
    hover = () => { document.getElementById('dashImg').style.backgroundImage = `url(${powerUpF})`; };
    leave = () => { document.getElementById('dashImg').style.backgroundImage = `url(${idleF})`; };
    zoomIn = () => { document.getElementById('dashImg').style.backgroundSize = `contain`; };
    zoomOut = () => { document.getElementById('dashImg').style.backgroundSize = `auto`; };
    render() {
        return (
            <div id="dashboard" className="row">
                <div id="dashImg" className="flex-1" style={{ backgroundImage: `url(${idleF})` }}
                 onMouseEnter={this.hover} onMouseLeave={this.leave} onClick={this.zoomIn} onDoubleClick={this.zoomOut}></div>
                <span className="flex-8">
                    <h1>HollowSaiyan</h1>
                    <p>Level: 1</p>
                    <p>Experience: 0/10</p>
                </span>
                <button type="button" className="flex-1 btn1" onClick={this.props.click}>Create Goal</button>
            </div>
        );
    }
}
class NewGoal extends Component {
    render() {
        return (
            <div className="row">
                <span>
                    <h1>Goal Creation</h1>
                </span>
                <button type="button" className="btn1" onClick={this.props.click}>Back to Dashboard</button>
            </div>
        )
    }
}
class Goal extends Component {
    render() {
        return (
            <div className="row flex-1">
                <span>
                    <h1>Goal {this.props.nameOfGoal}</h1>
                </span>
                <button type="button" className="btn1" onClick={()=>this.props.click('')}>Back to Dashboard</button>
            </div>
        )
    }
}
const GoalDetail = ({nameOfGoal, clickFunction}) => {
    return (
      <div className="goal fnt-white">
        <div onClick={()=>clickFunction(nameOfGoal)}>
            <p>Goal {nameOfGoal} </p>
            <p>Difficulty: <i>1</i></p>
        </div>
      </div>
    );
}
const GoalList = (props) => {
    var goals = [];
    for(let i = 0; i < props.state.goals; i++){
        goals.push(<GoalDetail key={i} nameOfGoal={i} clickFunction={props.click}/>);
    }
    return(
        <div className="column" id="goalList">
            {goals}
        </div>
    );
}
class Home extends Component {
    state = {
        goals: 22,
        createGoal: false,
        showGOAL: true,
        nameOfGOAL: '',
        sprite: [],
    };
    createGoal = () => {
        this.setState({createGoal: !this.state.createGoal});
    };
    showGoal = (name) => {
        this.setState({nameOfGOAL: name});
        this.setState({showGOAL: !this.state.showGOAL});
    };
    render() {
        if(this.state.createGoal === true){
            return (
                <div className={`App-intro${this.props.appState.theme}`}>
                    <NewGoal click={this.createGoal}/>
                </div>
            );
        }
        else if(this.state.showGOAL === true){
            return (
                <div className={`App-intro${this.props.appState.theme}`}>
                    <Goal nameOfGoal={this.state.nameOfGOAL} click={this.showGoal}/>
                    <Calendar/>
                </div>
            );
        }
        return (
            <div className={`App-intro${this.props.appState.theme}`}>
                <Dashboard sprite={this.state.sprite} click={this.createGoal}/>
                <GoalList state={this.state} click={this.showGoal}/>
            </div>
        );
    }
}
  
export default Home;