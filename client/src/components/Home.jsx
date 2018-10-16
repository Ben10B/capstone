import React, { Component } from 'react';
// import idleM from '../Assets/img/Idle-Male.gif';
// import powerUpM from '../Assets/img/PowerUp-Male.gif';
import aura from '../Assets/img/Aura.gif';
import powerUpF from '../Assets/img/PowerUp-Female.gif';
import idleF from '../Assets/img/Idle-Female.gif';
import '../css/App.css';
import '../BENstrap-in/css/my.css';
import Calendar from './Calendar';
import CreateGoal from './CreateGoal';

import { connect } from 'react-redux';
import { getGoalsByUser } from '../actions/goalActions';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
    zoomOut = () => { document.getElementById('dashImg').style.backgroundSize = `auto`; };
    hover = () => { document.getElementById('dashImg').style.backgroundImage = `url(${powerUpF}), url(${aura})`; };
    leave = () => { document.getElementById('dashImg').style.backgroundImage = `url(${idleF})`; };
    zoomIn = () => { document.getElementById('dashImg').style.backgroundSize = `contain, 7em`; };
    zoomOut = () => { document.getElementById('dashImg').style.backgroundSize = `auto, 3em`; };
    render() {
        return (
            <div id="dashboard" className="row">
                <div id="dashImg" className="flex-1" style={{ backgroundImage: `url(${idleF})` }}
                 onMouseEnter={this.hover} onMouseLeave={this.leave} onClick={this.zoomIn} onDoubleClick={this.zoomOut}></div>
                <span className="flex-8">
                    <h1>{this.props.profile.handle}</h1>
                    <p>Level: 1</p>
                    <p>Experience: 0/0</p>
                </span>
                <button type="button" className="flex-1 btn1" onClick={this.props.click}>Create Goal</button>
            </div>
        );
    }
}

class Goal extends Component {
    render() {
        return (
            <div className="row flex-1">
                <span>
                    <h1>{this.props.nameOfGoal}</h1>
                </span>
                <button type="button" className="btn1" onClick={()=>this.props.click('')}>Back to Dashboard</button>
            </div>
        )
    }
}
const GoalDetail = ({goal, clickFunction}) => {
    return (
      <div className="goal fnt-white row">
        <div onClick={()=>clickFunction(goal.title)}>
            <p>{goal.title} </p>
            <p>Difficulty: <i>{goal.difficulty}</i></p>
        </div>
        <div>
            <p>Health: <i>{goal.health}</i></p>
        </div>
      </div>
    );
}
class GoalList extends Component {
    render(){
        var goals = [];
        for(let i = 0; i < this.props.goalList.length; i++){
            goals.push(<GoalDetail key={i} goal={this.props.goalList[i]} clickFunction={this.props.click}/>);
        }
        return(
            <div className="column" id="goalList">
                {goals}
            </div>
        );
    }
}
class Home extends Component {
    state = {
        goals: 2,
        createGoal: false,
        showGOAL: false,
        nameOfGOAL: '',
    };
    componentWillMount(){
        this.props.getGoalsByUser(this.props.profile.user._id);
    }
    
    createGoal = () => {
        this.setState({createGoal: !this.state.createGoal});
    };
    showGoal = (name) => {
        this.setState({nameOfGOAL: name});
        this.setState({showGOAL: !this.state.showGOAL});
    };
    render() {
        const { goals } = this.props.goal;
        if(this.state.createGoal === true){
            return (
                <div className={`App-intro${this.props.appState.theme}`}>
                    <CreateGoal click={this.createGoal}/>
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
                <Dashboard profile={this.props.profile} appState={this.props.appState} sprite={this.state.sprite} click={this.createGoal}/>
                <GoalList state={this.state} goalList={goals} click={this.showGoal}/>
            </div>
        );
    }
}

Home.propTypes = {
    getGoalsByUser: propTypes.func.isRequired,
    goal: propTypes.object.isRequired
  }
  
const mapStateToProps = (state) => ({
    goal: state.goal,
  });

export default connect(mapStateToProps, { getGoalsByUser })(withRouter(Home));