import React, { Component } from 'react';
import Calendar from './Calendar';
import '../css/goal.css';
import '../css/calendar.css';
import idleF from '../Assets/img/Idle-Female.gif';
import idleM from '../Assets/img/Idle-Male.gif';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateGoal, deleteGoal } from '../actions/goalActions';
import { updateSprite } from '../actions/spriteActions';
import propTypes from 'prop-types';

class Goal extends Component {
  state = { selectedGoal: this.props.selectedGoal,
    show: false, 
    selectedDay: null,
    calendarState: null,
    selectedGoal: this.props.selectedGoal,
    sprite: this.props.sprite.sprite,
    updateCalendar: false,
  }
  
  componentDidMount(){
    this.updateProgressBar(this.props.selectedGoal.health);
  }
  showModal = (day, status, calendarState) => {
    this.setState({updateCalendar: false});

    if (status === "unresolved" || status === "unresolved-today") {
      this.setState({ selectedDay: day });
      this.setState({ calendarState: calendarState });
      this.setState({ show: true });
    }
    else
      this.setState({ show: false });
  }
  hideModal = () => {
    this.setState({ show: false });
  }
  updateProgressBar = (newHealth, updatedGoal) => {
    if(updatedGoal !== undefined) this.setState({ selectedGoal: updatedGoal});
    var progressbar = document.getElementById("progressbar");   
    var pbar_width = 1;
    var currentHealth = (newHealth / this.state.selectedGoal.maxHealth) * 100;
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
  updateStatus = (status) => {
    console.log(status);

    const updatedGoal = this.state.selectedGoal;
    const updatedSprite = this.state.sprite;
    const diff = this.state.selectedGoal.difficulty;

    //If no, take away health; if yes, give gold
    if (status === "incomplete") { 
      if(window.confirm('Are you sure it was not successful?')){
        updatedGoal.health = this.dealDamage(diff); this.updateProgressBar(updatedGoal.health, updatedGoal); 
      } else return;
    }
    else {
      if(window.confirm('Are you sure it was successful?')){
        updatedSprite.gold += this.receiveReward(diff);
      } else return;
    }

    //Change status to complete/incomplete
    let day = this.state.selectedDay;
    day.status = status;

    //If health is <= 0, delete goal
    //Else if last day is completed, go to homepage
    //Else update sprite and goal
    if (updatedGoal.health <= 0) {
      updatedGoal.result = "INCOMPLETE";
      this.props.updateGoal(updatedGoal, updatedGoal._id);
      this.props.history.push('/');
    } else if (updatedGoal.days[updatedGoal.days.length - 1].status === "complete") {
      updatedGoal.result = "COMPLETE";
      this.completeGoal(diff, updatedSprite, updatedGoal);
    } else {
      this.props.updateGoal(updatedGoal, updatedGoal._id);
      this.props.updateSprite(updatedSprite, updatedSprite._id);
      this.setState({updateCalendar: true});
    }
    this.setState({ show: false });
  };
  dealDamage = (diff) => {
    let maxHealth = this.state.selectedGoal.maxHealth;
    let health = 0;
    switch (diff) {
      case 1: health = maxHealth - 1; break;
      case 2: health = maxHealth - 5; break;
      case 3: health = maxHealth - 10; break;
      default: break;
    }
    return health;
  }
  receiveReward = (diff) => {
    switch (diff) {
      case 1: return 25;
      case 2: return 50;
      case 3: return 100;
      default: return 0;
    }
  }
  addExp = (diff, updatedSprite) => {
    let exp = 0;
    switch (diff) {
      case 1: exp = 10; break;
      case 2: exp = 20; break;
      case 3: exp = 40; break;
      default: break;
    }
    updatedSprite.experience += exp;
    //if overflow equals true, loop again
    while (updatedSprite.experience >= updatedSprite.experienceLimit) {
      //Decrease exp by limit
      updatedSprite.experience -= updatedSprite.experienceLimit;
      //Increase expLimit if achieved
      updatedSprite.experienceLimit = updatedSprite.experienceLimit * 2;
      updatedSprite.level++; //Increase level
    }
  }
  completeGoal = (diff, updatedSprite, updatedGoal) => {
    this.addExp(diff, updatedSprite); //Add experience
    updatedSprite.goalsCompleted++; //Increase goal record
    updatedSprite.gold += Math.round(this.receiveReward(diff) * 1.5); //Add gold * bonus

    // console.log(updatedSprite);
    this.props.updateSprite(updatedSprite, updatedSprite._id);
    this.props.updateGoal(updatedGoal, updatedGoal._id);
    this.props.history.push('/');
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
          <div>
            {this.state.selectedGoal.description}
          </div>
          <Details show={this.state.show} handleClose={this.hideModal}
            calendarState={this.state.calendarState} selectedDay={this.state.selectedDay}
            click={this.updateStatus}
          />
          <ProgressBar progress={this.state.selectedGoal}/>
          <Calendar selectedGoal={this.props.selectedGoal} updateCal={this.state.updateCalendar} showModalClick={this.showModal}/>
        </div>
      )
  }
}

const Details = ({handleClose, show, calendarState, selectedDay, click}) => {
  const showHideClassName = show ? 'detail-container modal display-block' : 'detail-container modal display-none';
  const isCalendarNull = (calendarState === null) ? true : false;
  const isDayNull = (selectedDay === null) ? true : false;
  return (
    <div className={showHideClassName}>
      <div className="details modal-main row">
        <div className="">Was today Successful?</div>
        <h6 className="detailsHeading">Day {isDayNull ? '' : selectedDay.dayOfMonth}</h6>
        <div className="detailImg" style={{ 
          backgroundImage: `url(${isCalendarNull ? '' :
          (calendarState.sprite.gender === "Female") ? idleF : idleM})` }}
        ></div>
        <div className="row yes-no-container">
          <button type="button" 
          onClick={() => click('complete')} 
          className="btn1 green"><i className="fas fa-check"></i></button>
          <button type="button" 
          onClick={() => click('incomplete')} 
          className="btn1 red"><i className="fas fa-times"></i></button>
        </div>
        <button className="btn1" onClick={handleClose}> Close </button>
      </div>
    </div>
  );
}

const ProgressBar = ({progress}) => {
  return (
    <div className="progressbar-container">
      <div id="progressbar" className="">{progress.health}/{progress.maxHealth}</div>
    </div>
  )
}

Goal.propTypes = {
  updateGoal: propTypes.func.isRequired,
  deleteGoal: propTypes.func.isRequired,
  updateSprite: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  goal: state.goal,
  sprite: state.sprite
});

export default connect(mapStateToProps, { updateGoal, deleteGoal, updateSprite })(withRouter(Goal));