import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { updateSprite } from '../actions/spriteActions';
// import propTypes from 'prop-types';
import '../css/calendar.css';
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
  };
  componentWillUpdate(){
    if(this.props.updateCal === true){
      this.getDays(this.state.monthIndex, this.state.currentYear);
    }
  }
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
          tempDays.push(<Day key={`${i}.${currentMonth}`} showModalClick={this.props.showModalClick} click={this.showDetails} calendarState={this.state} yes={"yes"}
            element={tempSelectedGoal[element]} dateString={improvedDate.date().toString()} date={improvedDate.format('YYYY-MM-DD')}
          />);
        }
      }
      if (isValid === false) { //Days user didn't select; add to array
        tempDays.push(<Day key={`${i}.${currentMonth}`} element={{}} showModalClick={this.props.showModalClick} click={this.showDetails} calendarState={this.state} yes={"no"}
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
  render() {
    return (
      <div className='calendar-container'>
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
        {/* <Details calendarState={this.state} click={this.updateStatus} /> */}
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
        onClick={() => this.props.showModalClick(this.props.element, this.state.dailyGoal.status, this.props.calendarState)}>
        {this.props.dateString}
      </td>
    );
  }
}


Calendar.propTypes = {
  
}

const mapStateToProps = (state) => ({
  goal: state.goal,
  sprite: state.sprite
});

export default connect(mapStateToProps, {  })(withRouter(Calendar));