import React, { Component } from 'react';
import Calendar from './Calendar';
import '../css/goal.css';
import '../css/calendar.css';
import idleF from '../Assets/img/Idle-Female.gif';
import idleM from '../Assets/img/Idle-Male.gif';
import damagedF from '../Assets/img/Damaged-Female.png';
import damagedM from '../Assets/img/Damaged-Male.png';
import yesF from '../Assets/img/Completed-Female.png';
import yesM from '../Assets/img/Completed-Male.png';
import { GoalResult, LevelUp } from './modals/Modals';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateGoal, deleteGoal } from '../actions/goalActions';
import { updateSprite } from '../actions/spriteActions';
import propTypes from 'prop-types';

class Goal extends Component {
  state = { 
    selectedGoal: this.props.selectedGoal,
    show: false,
    showConfirmWindow: false,
    showGoalResult: false,
    confirmation: false, 
    selectedDay: null,
    calendarState: null,
    sprite: this.props.sprite.sprite,
    updateCalendar: false,
    resultSprite: {},
    resultGoal: {},
    status: ''
  }
  
  componentDidMount(){
    this.updateProgressBar(this.props.selectedGoal.health);
  }
  showDetails = (day, status, calendarState) => {
    this.setState({updateCalendar: false});

    if (status === "unresolved" || status === "unresolved-today") {
      this.setState({ selectedDay: day });
      this.setState({ calendarState: calendarState });
      this.setState({ show: true });
    }
    else
      this.setState({ show: false });
  }
  hideDetails = () => {
    this.setState({ show: false });
  }
  showConfirm = (status) => {
    this.setState({ showConfirmWindow: true });
    this.setState({ status: status });
  }
  hideConfirm = () => {
    this.setState({ showConfirmWindow: false });
  }
  showGoalResult = () => {
    this.setState({ showGoalResult: true });
  }
  hideGoalResult = () => {
    this.setState({ showGoalResult: false });
  }
  calendarUpdated = () => {
    this.setState({updateCalendar: false});
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
    const updatedGoal = this.state.selectedGoal;
    const updatedSprite = this.state.sprite;
    const diff = this.state.selectedGoal.difficulty;

    //If no, take away health; if yes, give gold
    if (status === "incomplete") { 
      updatedGoal.health = this.dealDamage(diff); this.updateProgressBar(updatedGoal.health, updatedGoal); 
    } else {
      updatedSprite.gold += this.receiveReward(diff);
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
      // this.setState({resultGoal: updatedGoal});
      // this.showGoalResult();
    } else if (updatedGoal.days[updatedGoal.days.length - 1].status === "complete") {
      updatedGoal.result = "COMPLETE";
      this.completeGoal(diff, updatedSprite, updatedGoal);
      // this.setState({resultGoal: updatedGoal});
      // this.showGoalResult();
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
      case 1: health = maxHealth - diff; break;
      case 2: health = maxHealth - diff; break;
      case 3: health = maxHealth - diff; break;
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

    this.props.updateSprite(updatedSprite, updatedSprite._id);
    this.props.updateGoal(updatedGoal, updatedGoal._id);
    this.props.history.push('/');
  }
  render() {
    const { sprite } = this.props.sprite;
      return (
        <div className="">
          <div className="row">
            <span>
                <h1>{this.props.selectedGoal.title}</h1>
            </span>
            <button type="button" className="btn1" onClick={()=>this.props.click('')}>Back to Dashboard</button>
          </div>
          <div className="">
            {this.state.selectedGoal.description}
            {this.state.selectedGoal.reward ? 
              <details><summary>REWARD</summary> {this.state.selectedGoal.reward}</details> : ''}
            {this.state.selectedGoal.punishment ? 
              <details><summary>PENALTY</summary> {this.state.selectedGoal.punishment}</details> : ''}
          </div>
          <GoalResult show={this.state.showGoalResult} close={this.hideGoalResult} sprite={sprite} goal={this.state.resultGoal}/>
          <Confirmation show={this.state.showConfirmWindow} close={this.hideConfirm} sprite={sprite} 
            update={this.updateStatus} status={this.state.status} selectedGoal={this.state.selectedGoal}/>
          <Details show={this.state.show} handleClose={this.hideDetails}
            calendarState={this.state.calendarState} selectedDay={this.state.selectedDay}
            showCW={this.showConfirm}
          />
          <ProgressBar progress={this.state.selectedGoal}/>
          <Calendar selectedGoal={this.props.selectedGoal} updateCal={this.state.updateCalendar}
           showModalClick={this.showDetails} calUpdated={this.calendarUpdated}/>
        </div>
      )
  }
}

const Details = ({handleClose, show, calendarState, selectedDay, showCW}) => {
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
        <div className="yes-no-container">
          <button type="button" 
          onClick={() => showCW('complete')} 
          className="btn1 green"><i className="fas fa-check"></i></button>
          <button type="button" 
          onClick={() => showCW('incomplete')} 
          className="btn1 red"><i className="fas fa-times"></i></button>
        </div>
        <button className="btn1" onClick={handleClose}> Close </button>
      </div>
    </div>
  );
}
const Confirmation = ({show, close, sprite, update, status, selectedGoal}) => {
  const showHideClassName = show ? 'detail-container modal display-block z-index' : 'detail-container modal display-none';
  this.showEXP = (diff) => {
    switch (diff) {
      case 1: return 10;
      case 2: return 20;
      case 3: return 40;
      default: return 0;
    }
  }
  this.showReward = (diff) => {
    switch (diff) {
      case 1: return 25;
      case 2: return 50;
      case 3: return 100;
      default: return 0;
    }
  }
  return (
    <div className={showHideClassName}>
      <div className="details modal-main row">
        {(status === 'complete') ? 
          <div className="">
            <p>Are you sure it was successful?</p>
            <p>+{this.showReward(selectedGoal.difficulty)} Gold</p>
            <p>+{this.showEXP(selectedGoal.difficulty)} EXP</p>
          </div> : 
          <div className=""><p>Are you sure it wasn't successful?</p><p>-{selectedGoal.difficulty}HP</p></div>}
        <div className="detailImg" 
        style={{ backgroundImage: `url(${status === 'complete' ? 
          ((sprite.gender === "Female") ? yesF : yesM) :
          ((sprite.gender === "Female") ? damagedF : damagedM)
        })` }}
        ></div>
        <div className="yes-no-container">
          <button type="button" 
          onClick={() => {update(status); close();}} 
          className="btn1 green">YES</button>
          <button type="button" 
          onClick={() => close()} 
          className="btn1 red">OOPS, NAH</button>
        </div>
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