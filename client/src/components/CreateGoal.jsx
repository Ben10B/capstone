import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGoal, checkGoal } from '../actions/goalActions';
import { updateSprite } from '../actions/spriteActions';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from './common/TextFieldGroup';
import moment from 'moment';
import '../css/create-goal.css';

class CreateGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      difficulty: 0,
      reward: '',
      punishment: '',
      partners: [],
      date: moment().format('YYYY-MM-DD'),
      sun: false,
      mon: false,
      tue: false,
      wed: false,
      th: false,
      fri: false,
      sat: false,
      weekends: false,
      weekdays: false,
      custom: false,
      errors: {},
      show: false,
      addFriends: false,
      numberOfDays: 0,
      friendlyFire: false,
      message: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate(prevProps, prevState){
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
    if (this.props.goal.isValid !== prevProps.goal.isValid && this.props.goal.isValid === true){
      this.showModal();
    }
    if(prevState !== this.state){
      let buttons = document.getElementsByClassName('prospect');
      const homies = this.state.partners;
      if(homies.length !== 0 && buttons.length !== 0){
        for(var i =0; i < homies.length; i++){
          if(buttons.item(i).id === homies[i].name){ buttons.item(i).classList.add('selected'); }
        }
      }
    }
  }
  showModal = () => {
    this.setState({ show: true });
  }
  hideModal = () => {
    this.setState({ show: false });
  }
  showFriends = () =>{
    this.setState({addFriends: true});
  }
  hideFriends = () =>{
    this.setState({addFriends: false});
  }
  recruit = (handle, id) => {
    let list = this.state.partners;
    if(document.getElementById(handle).classList.contains('selected')){
      let index = list.findIndex(homie => homie.name === handle);
      list.splice(index, 1);
      document.getElementById(handle).classList.remove('selected');
    }else{
      list.push({name: handle, id: id});
      document.getElementById(handle).classList.add('selected');
    }
    this.setState({partners: list});
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onCheck = (e) => {
    if(e.target.name === 'weekends'){
      this.setState({ sat: e.target.checked });
      this.setState({ sun: e.target.checked });
      this.setState({ weekends: e.target.checked });
    } else if(e.target.name === 'weekdays'){
      this.setState({ mon: e.target.checked });
      this.setState({ tue: e.target.checked });
      this.setState({ wed: e.target.checked });
      this.setState({ th: e.target.checked });
      this.setState({ fri: e.target.checked });
      this.setState({ weekdays: e.target.checked });
    } else {
      this.setState({ [e.target.name]: e.target.checked });
    }
  }
  switchDays = () => {
    this.setState({ custom: !this.state.custom});
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { sprite } = this.props.sprite;
    const days = this.calendar(this.state.date, sprite);
    const maxHealth = days.length;
    this.setState({numberOfDays: maxHealth});
    let diff = this.calcDifficulty(maxHealth);
    const goalData = {
      title: this.state.title,
      description: this.state.description,
      reward: this.state.reward,
      punishment: this.state.punishment,
      difficulty: diff,
      partners: this.state.partners,
      date: this.state.date,
      days: days,
      friendlyFire: this.state.friendlyFire,
      sun: this.state.sun,
      mon: this.state.mon,
      tue: this.state.tue,
      wed: this.state.wed,
      th: this.state.th,
      fri: this.state.fri,
      sat: this.state.sat,
      maxHealth: maxHealth,
      level: sprite.level,
    };
    
    this.props.checkGoal(goalData);
    this.setState({goalData: goalData});
  }
  calendar = (endDate, sprite) => {
    let current = new Date();
    let cMonth = current.getMonth();
    let cYear = current.getFullYear();
    let cDay = current.getDate();
    //Get total days between now and then
    let a = moment(new Date(cYear, cMonth, cDay), 'YYYY-MM-DD');
    let b = moment(endDate, 'YYYY-MM-DD');
    let days = b.diff(a, 'days');
    //Add days to array according to checked weekdays
    let i = 0;
    let tempArray = [];
    //Add current day to array only if checked weekday matches today's weekday
    if (((this.state.sun && a.day() === 0) && a.date() === cDay) || ((this.state.mon && a.day() === 1) && a.date() === cDay)
      || ((this.state.tue && a.day() === 2) && a.date() === cDay) || ((this.state.wed && a.day() === 3) && a.date() === cDay)
      || ((this.state.th && a.day() === 4) && a.date() === cDay) || ((this.state.fri && a.day() === 5) && a.date() === cDay)
      || ((this.state.sat && a.day() === 6) && a.date() === cDay))
      tempArray.push({ status: "unresolved", year: a.year(), month: a.month(), dayOfMonth: a.date(), date: moment(a, 'YYYY-MM-DD') });

    while (i < days) {
      let newDate = a.add(1, 'days');
      if (this.state.sun && a.day() === 0) {
        tempArray.push({ status: "inactive", year: newDate.year(), month: newDate.month(), dayOfMonth: newDate.date(), date: moment(newDate, 'YYYY-MM-DD') });
      }
      if (this.state.mon && a.day() === 1) {
        tempArray.push({ status: "inactive", year: newDate.year(), month: newDate.month(), dayOfMonth: newDate.date(), date: moment(newDate, 'YYYY-MM-DD') });
      }
      if (this.state.tue && a.day() === 2) {
        tempArray.push({ status: "inactive", year: newDate.year(), month: newDate.month(), dayOfMonth: newDate.date(), date: moment(newDate, 'YYYY-MM-DD') });
      }
      if (this.state.wed && a.day() === 3) {
        tempArray.push({ status: "inactive", year: newDate.year(), month: newDate.month(), dayOfMonth: newDate.date(), date: moment(newDate, 'YYYY-MM-DD') });
      }
      if (this.state.th && a.day() === 4) {
        tempArray.push({ status: "inactive", year: newDate.year(), month: newDate.month(), dayOfMonth: newDate.date(), date: moment(newDate, 'YYYY-MM-DD') });
      }
      if (this.state.fri && a.day() === 5) {
        tempArray.push({ status: "inactive", year: newDate.year(), month: newDate.month(), dayOfMonth: newDate.date(), date: moment(newDate, 'YYYY-MM-DD') });
      }
      if (this.state.sat && a.day() === 6) {
        tempArray.push({ status: "inactive", year: newDate.year(), month: newDate.month(), dayOfMonth: newDate.date(), date: moment(newDate, 'YYYY-MM-DD') });
      }
      i++;
    }
    //If this is the first goal add guaranteed item
    if(sprite.goalsCreated === 0){
      let gItem = Math.floor(Math.random() * tempArray.length);
      tempArray[gItem].item = 'Virtuous';
    }
    
    return tempArray;
  };
  calcDifficulty = (numOfDays) => {
    if(numOfDays <= 14) { 
      this.setState({difficulty: 1});
      this.setState({message: `The lowest difficulty.`}); return 1;
    }
    else if(numOfDays > 14 && numOfDays <= 31){
      this.setState({difficulty: 2});
      this.setState({message: `The Second Highest Difficulty.`}); return 2;
    }
    else if(numOfDays > 31 && numOfDays <= 60){
      this.setState({difficulty: 3});
      this.setState({message: `THE HIGHEST DIFFICULTY.`}); return 3;
    } 
  }
  render() {
    const { errors } = this.state;
    const { sprite } = this.props.sprite;
    const { profile } = this.props.profile;
    let view;
    let friends;
    if(profile.friends.length > 0) {
      friends = profile.friends.map(friend => (
        <button key={friend._id} className={`btn1 prospect`} id={friend.profile.handle}
        onClick={()=>this.recruit(friend.profile.handle, friend.profile._id)}>{friend.profile.handle}</button>
      )); 
    } else { friends = <div>No Friends Yet</div>}
    if(!this.state.addFriends){
      view = (
        <div>
          <form className="column cgForm" noValidate onSubmit={this.onSubmit}>
            {errors.other && (<div className="err invalid-feedback">{errors.other}</div>)}
            <label>*TITLE
              <i className="far fa-question-circle hint" title="Try to keep short. It helps narrowing your focus."></i>
            </label>
            <TextFieldGroup name="title" type="text"
              placeholder="Ex: Prevent cavities."
              value={this.state.title} onChange={this.onChange}
              error={errors.title}
            />
            {errors.title && (<div className="err invalid-feedback">{errors.title}</div>)}
            <label>*DESCRIPTION
              <i className="far fa-question-circle hint" title="Be specific."></i>
            </label>
            <TextFieldGroup name="description" type="text"
              placeholder="Ex: I will floss and brush my teeth at night."
              value={this.state.description} onChange={this.onChange}
              error={errors.description}
            />
            {errors.description && (<div className="err invalid-feedback">{errors.description}</div>)}
            <label>Reward
              <i className="far fa-question-circle hint" title="Something you might reward yourself."></i>
            </label>
            <TextFieldGroup name="reward" type="text"
              placeholder="Ex: I will buy a large meatlovers pizza."
              value={this.state.reward} onChange={this.onChange}
            />
            <label>Punishment
              <i className="far fa-question-circle hint" title="Something you don't wanna do."></i>
            </label>
            <TextFieldGroup name="punishment" type="text"
              placeholder="Ex: I will do the cinnamon challenge."
              value={this.state.punishment} onChange={this.onChange}
            />
            <label>*Estimated End Date
              <i className="far fa-question-circle hint" title="The day you plan to finish!"></i>
            </label>
            <input name="date" type="date" onChange={this.onChange} error={errors.date} value={this.state.date} />
            {errors.date && (<div className="err invalid-feedback">{errors.date}</div>)}
            <label>*Check DAY(s) You Plan to Grind
              <i className="far fa-question-circle hint" title="These repeat every week!"></i>
            </label>
            <div className="row" style={{ display: 'flex', flexDirection: 'row' }} error={errors.daysOftheWeek}>
              {this.state.custom === false ? (
                <div className="row">
                  <p><input type="checkbox" name="weekends" onChange={this.onCheck} checked={this.state.weekends}/>Weekends</p>
                  <p><input type="checkbox" name="weekdays" onChange={this.onCheck} checked={this.state.weekdays}/>Weekdays</p>
                  <p className="btn1" onClick={this.switchDays}>Custom</p>
                </div>
              ) : (
                  <div className="checkboxes">
                    <p><input type="checkbox" name="sun" onChange={this.onCheck} checked={this.state.sun}/>Sun</p>
                    <p><input type="checkbox" name="mon" onChange={this.onCheck} checked={this.state.mon}/>Mon</p>
                    <p><input type="checkbox" name="tue" onChange={this.onCheck} checked={this.state.tue}/>Tue</p>
                    <p><input type="checkbox" name="wed" onChange={this.onCheck} checked={this.state.wed}/>Wed</p>
                    <p><input type="checkbox" name="th" onChange={this.onCheck} checked={this.state.th}/>Th</p>
                    <p><input type="checkbox" name="fri" onChange={this.onCheck} checked={this.state.fri}/>Fri</p>
                    <p><input type="checkbox" name="sat" onChange={this.onCheck} checked={this.state.sat}/>Sat</p>
                    <p className="btn1" onClick={this.switchDays}><i className="fas fa-angle-right"></i></p>
                  </div>
                )}
            </div>
            {errors.daysOftheWeek && (<div className="err invalid-feedback">{errors.daysOftheWeek}</div>)}
            <div className="btn1" onClick={this.showFriends}>Add Friends</div>
            <input className="btn1" type="submit" value="CREATE GOAL" />
          </form>
        </div>
      );
    } else {
      view = (<div>
        <label>Friends</label>
        <p>
          <input type="checkbox" name="friendlyFire" onChange={this.onCheck} checked={this.state.friendlyFire} />Friendly Fire
          <i className="far fa-question-circle hint" title="Your friends can influence your goal!"></i>
        </p>
        <div className="pad-5">
          {friends}
        </div>
        <div className="btn1 margn-3" onClick={this.hideFriends}>Hide Friends</div>
      </div>);
    }
    return (
      <div className="column">
        <div>
          <span className="row">
            <h1>Goal Creation</h1>
            <button type="button" className="btn1" onClick={this.props.click}>Back to Dashboard</button>
          </span>
        </div>
        <Details show={this.state.show} handleClose={this.hideModal} cgState={this.state} updateSprite={this.props.updateSprite}
          addGoal={()=>this.props.addGoal(this.state.goalData, this.props.history)} sprite={sprite}/>
        {view}
      </div>
    )
  }
}

const Details = ({handleClose, show, cgState, updateSprite, addGoal, sprite}) => {
  const showHideClassName = show ? 'detail-container modal display-block' : 'detail-container modal display-none';
  const receiveReward = (diff) => {
    switch (diff) {
      case 1: return 25;
      case 2: return 50;
      case 3: return 100;
      default: return 0;
    }
  }
  const addExp = (diff) => {
    switch (diff) {
      case 1: return 10;
      case 2: return 20;
      case 3: return 40;
      default: break;
    }
  }
  return (
    <div className={showHideClassName}>
      <div className="details modal-main column">
        <h4 className="detailsHeading">Overview</h4>
        <div className="row">
          <div className="column">
            <p>Title: {cgState.title}</p>
            <p>Description: {cgState.description}</p>
            {cgState.reward ? (<p>Reward: {cgState.reward}</p>) : ''}
            {cgState.punishment ? (<p>Punishment: {cgState.punishment}</p>) : ''}
          </div>
          <div className="column">
            <p>Difficulty: {cgState.difficulty}</p>
            <p>Total Day(s): {cgState.numberOfDays}</p>
            <p>Daily Reward: +{receiveReward(cgState.difficulty)} Gold</p>
            <p>Daily Penalty: -{cgState.difficulty} HP</p>
            <p>Goal Completion: {addExp(cgState.difficulty)} EXP, {receiveReward(cgState.difficulty)} Gold * BONUS</p>
          </div>
          {cgState.partners.length === 0 ? "" : (
            <div key={Math.random()+Math.random()}>
              <p>Friendly Fire: {cgState.friendlyFire ? 'ON' : 'OFF'}</p>
              {cgState.partners.map(friend => (<p key={friend.id}>{friend.name}</p>))}
            </div>
          )}
        </div>
        <div className="row yes-no-container">
          <button type="button" 
          onClick={()=>{
            addGoal();
            sprite.goalsCreated++;
            if(sprite.goalsCreated === 1 && sprite.goalsCompleted === 0){
              sprite.achievements.push({name: 'Create 1 Goal', acquired: true});
            }
            sprite.achievements.forEach(reward => {
              if(cgState.partners > 0 && reward.name !== 'Partner Up!'){
                sprite.achievements.push({name: 'Partner Up!', acquired: true});
              }
            });
            updateSprite(sprite, sprite._id);
          }} 
          className="btn1 green"><i className="fas fa-check"></i> Looks good</button>
          <button type="button" 
          onClick={handleClose} 
          className="btn1 red"><i className="fas fa-times"></i> Nah</button>
        </div>
      </div>
    </div>
  );
}

CreateGoal.propTypes = {
  addGoal: propTypes.func.isRequired,
  updateSprite: propTypes.func.isRequired,
  checkGoal: propTypes.func.isRequired,
  goal: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  goal: state.goal,
  sprite: state.sprite,
  errors: state.errors,
  profile: state.profile,
});

export default connect(mapStateToProps, { addGoal, checkGoal, updateSprite })(withRouter(CreateGoal));