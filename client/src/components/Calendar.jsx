import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateGoal, deleteGoal } from '../actions/goalActions';
import { updateSprite } from '../actions/spriteActions';
import propTypes from 'prop-types';
import '../css/calendar.css';
import idleF from '../Assets/img/Idle-Female.gif';
import idleM from '../Assets/img/Idle-Male.gif';
import moment from 'moment';

class Calendar extends Component {
  constructor(props) {
    super(props);
    let d = new Date();
    this.state = {
      today: moment().format('YYYY-MM-DD'),
      currentMonth: d.getMonth(),
      currentYear: d.getFullYear(),
      currentDay: d.getDate(),
      days: [],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthIndex: d.getMonth(),
      showDETAILS: false,
      selectedDay: '',
      selectedGoal: this.props.selectedGoal,
      sprite: this.props.sprite.sprite,
    }
    this.switchMonths = this.switchMonths.bind(this);
    this.getDays = this.getDays.bind(this);
  }
  componentDidMount() {
    this.getDays(this.state.currentMonth, this.state.currentYear);
    document.getElementById('the-month').innerHTML = this.state.months[this.state.monthIndex];
    document.getElementById('the-year').innerHTML = this.state.currentYear;
  }; componentWillUnmount() { };

  switchMonths = (index) => {
    let monthIndex = this.state.monthIndex;
    let newIndex = monthIndex += index;
    let temp = this.navigateCalender(newIndex);
    this.setState({ days: [] });
    this.getDays(temp, this.state.currentYear);
  };
  navigateCalender = (index) => {
    let newIndex = 0;
    newIndex = index;

    if (index < 0) index = 11;
    else if (index > 11) index = 0;
    document.getElementById('the-month').innerHTML = this.state.months[index];

    this.setState(prevState => { return { monthIndex: prevState.monthIndex = index } });
    return newIndex;
  };
  showDetails = (day, status) => {
    if (status === "unresolved" || status === "unresolved-today") {
      this.setState({ selectedDay: day });
      this.setState({ showDETAILS: true });
    }
    else
      this.setState({ showDETAILS: false });
  };
  getDays = (currentMonth, currentYear) => {
    let date = new Date();
    if (currentMonth === -1) { currentYear--; currentMonth = 11; }
    if (currentMonth === 12) { currentYear++; currentMonth = 0; }
    date = new Date(currentYear, currentMonth, 1);
    let improvedDate = moment(date, 'YYYY-MM-DD');

    this.setState(prevState => { return { currentMonth: prevState.currentMonth = currentMonth } });
    let i = 0;
    let tempDays = [];
    let tempSelectedGoal = this.state.selectedGoal.days;
    // console.log(moment(element.date, 'YYYY-MM-DD').toDate());
    while (improvedDate.month() === currentMonth) {
      let isValid = false;
      //Put empty days prior to day 1
      if (i === 0) tempDays = this.addSpace(date);
      //Add days to tempDays array
      for (let element in tempSelectedGoal) {
        //If user selected day equals day, pass element to array
        if (moment(tempSelectedGoal[element].date, 'YYYY-MM-DD').date() === improvedDate.date() && moment(tempSelectedGoal[element].date, 'YYYY-MM-DD').month() === improvedDate.month()) {
          isValid = true;
          tempDays.push(<Day key={`${i}.${currentMonth}`} click={this.showDetails} calendarState={this.state} yes={"yes"}
            element={tempSelectedGoal[element]} dateString={improvedDate.date().toString()} date={improvedDate.format('YYYY-MM-DD')}
          />);
        }
      }
      if (isValid === false) { //Days user didn't select; add to array
        tempDays.push(<Day key={i} element={{}} click={this.showDetails} calendarState={this.state} yes={"no"}
          dateString={improvedDate.date().toString()} date={improvedDate.format('YYYY-MM-DD')} />);
      }

      improvedDate.add(1, 'd'); //Increase day by 1
      i++;
    }
    this.setState(prevState => { return { days: prevState.days = tempDays } });
    this.setState(prevState => { return { currentYear: prevState.currentYear = currentYear } });

  };
  addSpace = (date) => {
    let weekdays = {
      'Sat': 6, 'Fri': 5, 'Thu': 4, 'Wed': 3, 'Tue': 2, 'Mon': 1,
    };
    let temp = [];
    for (let key in weekdays) {
      if (new Date(date).toUTCString().substring(0, 3).toString() === key) {
        for (let d = 0; d < weekdays[key]; d++) {
          temp.push(<Day key={`space${d}`} click={this.showDetails} element={{}} yes={"no"} calendarState={this.state} />);
        }
      }
    }
    return temp;
  };
  updateStatus = (status) => {
    console.log(status);
    const updatedGoal = this.state.selectedGoal;
    const updatedSprite = this.state.sprite;
    const diff = this.state.selectedGoal.difficulty;

    //If no, take away health; if yes, give gold
    if (status === "incomplete") { updatedGoal.health = this.dealDamage(diff); this.props.updatePB(updatedGoal.health, updatedGoal); }
    else updatedSprite.gold += this.receiveReward(diff);

    //Change status to complete/incomplete
    let day = this.state.selectedDay;
    day.status = status;

    // console.log(updatedGoal); console.log(updatedSprite);

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
      this.getDays(this.state.monthIndex, this.state.currentYear);
    }
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
      <div className='calendar-container flex-9'>
        <div className='calendar'>
          <div id='month'>
            <ul>
              <li id='prev' onClick={() => this.switchMonths(-1)}>&#10094;</li>
              <li id='next' onClick={() => this.switchMonths(1)}>&#10095;</li>
              <li>
                <p id='the-month'></p>
                <br />
                <span id='the-year'>{this.state.currentYear}</span>
              </li>
            </ul>
          </div>
          <table className="table">
            <tbody>
              <tr id='days'>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                {this.state.days}
              </tr>
            </tbody>
          </table>
        </div>
        <Details calendarState={this.state} click={this.updateStatus} />
      </div>
    );
  }
}

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyGoal: {},
      isToday: '',
    }
  }
  componentWillMount() {
    let currentGoalDay = moment(this.props.date, 'YYYY-MM-DD');
    if (currentGoalDay.isSame(this.props.calendarState.today)) {
      this.setState({ isToday: '-today' });
    }
    if (this.props.yes === "yes") {
      this.setState(prevState => ({ dailyGoal: prevState.dailyGoal = this.props.element }));

      let currentGoalDay2 = moment(this.props.element.date, 'YYYY-MM-DD');
      let updateStatus = this.props.element;
      if (currentGoalDay2.isSameOrBefore(moment().format('YYYY-MM-DD'))
        && this.props.element.status !== "complete" && this.props.element.status !== "incomplete") {
        updateStatus.status = "unresolved";
      }
    }
  }
  render() {
    return (
      <td className={`day ${this.state.dailyGoal.status}${this.state.isToday}`}
        onClick={() => this.props.click(this.props.element, this.state.dailyGoal.status)}>
        {this.props.dateString}
      </td>
    );
  }
}


class Details extends Component {
  componentWillUnmount() {
    //clear details
  };
  render() {
    return (
      <div className={this.props.calendarState.showDETAILS ? "detail-container flex-2 display-block" : "detail-container flex-2"}>
        <div className="details row">
          <h6 className="detailsHeading">Day {this.props.calendarState.selectedDay.dayOfMonth}</h6>
          <div className="detailImg" style={{ backgroundImage: `url(${(this.props.calendarState.sprite.gender === "Female") ? idleF : idleM})` }}></div>
          <div className="row yes-no-container">
            <button type="button" onClick={() => this.props.click('complete')} className="btn1 green"><i className="fas fa-check"></i></button>
            <button type="button" onClick={() => this.props.click('incomplete')} className="btn1 red"><i className="fas fa-times"></i></button>
          </div>
        </div>
        <div className="">Was today Successful?</div>
      </div>
    );
  }
}

Calendar.propTypes = {
  updateGoal: propTypes.func.isRequired,
  deleteGoal: propTypes.func.isRequired,
  updateSprite: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  goal: state.goal,
  sprite: state.sprite
});

export default connect(mapStateToProps, { updateGoal, deleteGoal, updateSprite })(withRouter(Calendar));