import React, { Component } from 'react';
import idleM from '../Assets/img/Idle-Male.gif';
import powerUpM from '../Assets/img/PowerUp-Male.gif';
import aura from '../Assets/img/Aura.gif';
import powerUpF from '../Assets/img/PowerUp-Female.gif';
import idleF from '../Assets/img/Idle-Female.gif';
import '../css/App.css';
import '../BENstrap-in/css/my.css';
import Goal from './Goal';
import CreateGoal from './CreateGoal';

import { connect } from 'react-redux';
import { getGoalsByUser, deleteGoal } from '../actions/goalActions';
import { getSpriteByUser } from '../actions/spriteActions';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
    zoomOut = () => { document.getElementById('dashImg').style.backgroundSize = `auto`; };
    hover = () => { document.getElementById('dashImg').style.backgroundImage = `url(${(this.props.sprite.gender === "Female") ? powerUpF : powerUpM}), url(${aura})`; };
    leave = () => { document.getElementById('dashImg').style.backgroundImage = `url(${(this.props.sprite.gender === "Female") ? idleF : idleM})`; };
    zoomIn = () => { document.getElementById('dashImg').style.backgroundSize = `contain, 7em`; };
    zoomOut = () => { document.getElementById('dashImg').style.backgroundSize = `auto, 3em`; };
    render() {
        return (
            <div id="dashboard" className="row">
                <div id="dashImg" className="flex-1" style={{ backgroundImage: `url(${(this.props.sprite.gender === "Female") ? idleF : idleM})` }}
                 onMouseEnter={this.hover} onMouseLeave={this.leave} onClick={this.zoomIn} onDoubleClick={this.zoomOut}></div>
                <span className="flex-8">
                    <h1>{this.props.profile.handle}</h1>
                    <p>Level: {this.props.sprite.level}</p>
                    <p>Experience: {this.props.sprite.experience}/{this.props.sprite.experienceLimit}</p>
                </span>
                <button type="button" className="flex-1 btn1" onClick={this.props.click}>Create Goal</button>
            </div>
        );
    }
}
const GoalDetail = ({goal, clickFunction, deleteFunction}) => {
    return (
      <div className="goal fnt-white row">
        <div className="flex-5" onClick={()=>clickFunction(goal)}>
            <p>{goal.title} </p>
            <p>Difficulty: <i>{goal.difficulty}</i></p>
        </div>
        <div className="flex-5" onClick={()=>clickFunction(goal)}>
            <p>Health: <i>{goal.health}/{goal.maxHealth}</i></p>
        </div>
        <div className="delBTN" onClick={()=>deleteFunction(goal._id)}><i className="fas fa-trash" style={{padding: '5px'}}></i></div>
      </div>
    );
}
class GoalList extends Component {
    render(){
        var goals = [];
        for(let i = 0; i < this.props.goalList.length; i++){
            goals.push(<GoalDetail key={i} goal={this.props.goalList[i]} 
                clickFunction={this.props.click} deleteFunction={this.props.delete}/>);
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
        createGoal: false,
        showGOAL: false,
        selectedGOAL: '',
    };
    componentWillMount(){
        this.props.getGoalsByUser(this.props.profile.user._id);
        this.props.getSpriteByUser(this.props.profile.user._id);
    }
    createGoal = () => {
        this.setState({createGoal: !this.state.createGoal});
    };
    deleteGoal = (id) => {
        this.props.deleteGoal(id);
    }
    showGoal = (goal) => {
        this.setState({selectedGOAL: goal});
        this.setState({showGOAL: !this.state.showGOAL});
    };
    render() {
        const { goals } = this.props.goal;
        const { sprite } = this.props.sprite;
        if(this.state.createGoal === true){
            return (
                <div className={`App-intro${this.props.appState.theme}`}>
                    <CreateGoal click={this.createGoal}/>
                </div>
            );
        }
        else if(this.state.showGOAL === true){
            return (
                <Goal appState={this.props.appState} selectedGoal={this.state.selectedGOAL} click={this.showGoal}/>
            );
        }
        return (
            <div className={`App-intro${this.props.appState.theme}`}>
                <Dashboard profile={this.props.profile} appState={this.props.appState} sprite={sprite} click={this.createGoal}/>
                <GoalList state={this.state} goalList={goals} click={this.showGoal} delete={this.deleteGoal}/>
            </div>
        );
    }
}

Home.propTypes = {
    getGoalsByUser: propTypes.func.isRequired,
    getSpriteByUser: propTypes.func.isRequired,
    deleteGoal: propTypes.func.isRequired,
    goal: propTypes.object.isRequired,
    sprite: propTypes.object.isRequired,
}
  
const mapStateToProps = (state) => ({
    goal: state.goal,
    sprite: state.sprite,
});

export default connect(mapStateToProps, { getGoalsByUser, deleteGoal, getSpriteByUser })(withRouter(Home));