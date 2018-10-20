import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGoal } from '../actions/goalActions';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import '../css/calendar.css';
import idleF from '../Assets/img/Idle-Female.gif';
import moment from 'moment';

class Calendar extends Component{
    constructor(props){
        super(props);
        let d = new Date();
        this.state = {
            today: d,
            currentMonth: d.getMonth(),
            currentYear: d.getFullYear(),
            currentDay: d.getDate(),
            days: [],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthIndex: d.getMonth(),
            showDETAILS: false,
            selectedDay: '',
            selectedGoal: this.props.selectedGoal,
        }
        this.switchMonths = this.switchMonths.bind(this);
        this.getDays = this.getDays.bind(this);
    }
    componentDidMount() { 
        this.getDays(this.state.currentMonth, this.state.currentYear);
        document.getElementById('the-month').innerHTML = this.state.months[this.state.monthIndex];
        document.getElementById('the-year').innerHTML = this.state.currentYear;
    };componentWillUnmount() { };

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

        this.setState(prevState => {return {monthIndex: prevState.monthIndex = index} });
        return newIndex;
    };
    showDetails = (day, status) => {
        if(status === "complete" || status === "incomplete" || status === "unresolved" || status === "unresolved-today"){
            this.setState({ selectedDay: day });
            this.setState({ showDETAILS: true });
        }
        else
            this.setState({ showDETAILS: false });
    };
    getDays = (currentMonth, currentYear) => {
        let date = new Date();
        if(currentMonth === -1){ currentYear--; currentMonth = 11; }
        if(currentMonth === 12){ currentYear++; currentMonth = 0; }
        date = new Date(currentYear, currentMonth, 1);
        let improvedDate = moment(date, 'YYYY-MM-DD');

        this.setState(prevState => {return {currentMonth: prevState.currentMonth = currentMonth} });
        let i = 0;
        let tempDays = [];
        // console.log(moment(element.date, 'YYYY-MM-DD').toDate());
        while (improvedDate.month() === currentMonth) {
            let isValid = false;
            //Put empty days prior to day 1
            if(i === 0) tempDays = this.addSpace(date);
            //Add days to tempDays array
            this.state.selectedGoal.days.forEach(element => {
                //If goal equals day pass element to day
                if(moment(element.date, 'YYYY-MM-DD').date() === improvedDate.date() && moment(element.date, 'YYYY-MM-DD').month() === improvedDate.month()){
                    isValid = true;
                    tempDays.push(<Day key={i} click={this.showDetails} calendarState={this.state} yes={"yes"} 
                        element={element} dateString={improvedDate.date().toString()} date={improvedDate.format('YYYY-MM-DD')}
                    />);
                }
            });
            if(isValid === false){
                tempDays.push(<Day key={i} element={{}} click={this.showDetails} calendarState={this.state} yes={"no"} dateString={improvedDate.date().toString()}/>);
            }
            
            improvedDate.add(1, 'd'); //Increase day by 1
            i++; 
        }
        this.setState({ days: tempDays });
        this.setState(prevState => {return {currentYear: prevState.currentYear = currentYear} });

    };
    addSpace = (date) => {
        let weekdays = {
            'Sat': 6, 'Fri': 5, 'Thu': 4, 'Wed': 3, 'Tue': 2, 'Mon': 1,
        };
        let temp = [];
        for(let key in weekdays){
            if(new Date(date).toUTCString().substring(0, 3).toString() === key){
                for(let d=0; d < weekdays[key]; d++){
                    temp.push(<Day key={`space${d}`} click={this.showDetails} element={{}} yes={"no"} calendarState={this.state}/>);
                }
            }
        }
        return temp;
    };
    updateStatus = (status) => {
        console.log(status);
    };
    
    render() {
        return (
            <div className='calendar-container flex-9'>
                <div className='calendar'>
                    <div id='month'>
                        <ul>
                            <li id='prev' onClick={()=>this.switchMonths(-1)}>&#10094;</li>
                            <li id='next' onClick={()=>this.switchMonths(1)}>&#10095;</li>
                            <li>
                                <p id='the-month'></p>
                                <br/>
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
                <Details calendarState={this.state} click={this.updateStatus}/>
            </div>
        );
    }
}

class Day extends Component {
    constructor(props){
        super(props);
        this.state = {
            dailyGoal: {},
        }
    }
    componentDidUpdate(prevProps) {
        if(prevProps.yes !== this.props.yes){
            this.setState(prevState => ({ dailyGoal: prevState.dailyGoal = this.props.element }));
            let currentGoalDay = moment(this.props.element.date, 'YYYY-MM-DD');
            if(currentGoalDay.diff(moment().format('YYYY-MM-DD')) > 0){
                let updateStatus = this.props.element;
                // updateStatus.status = "incomplete";
            }
        }
    }
    componentWillMount() {
        if(this.props.yes === "yes"){
            this.setState(prevState => ({ dailyGoal: prevState.dailyGoal = this.props.element }));
            
            let currentGoalDay = moment(this.props.element.date, 'YYYY-MM-DD');
            let updateStatus = this.props.element;
            if(currentGoalDay.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')){
                updateStatus.status += "-today";
            }
            else if(currentGoalDay.diff(moment().format('YYYY-MM-DD')) > 0){
                // updateStatus.status = "incomplete";
                // this.setState(prevState => ({ dailyGoal: prevState.dailyGoal = updateStatus }));
            }
            
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.monthIndex !== this.props.calendarState.monthIndex){
            if(this.props.yes === "yes"){
                this.setState({ dailyGoal: this.props.element });
            } else {
                this.setState(({ dailyGoal: {} }));
            }
        } else {
            this.setState(prevState => ({ dailyGoal: prevState.dailyGoal = {} }));
        } 
    };
    componentDidMount(){
        if(this.props.yes === "yes"){
        }
    }
    componentWillUnmount(){
        this.setState(prevState => ({ dailyGoal: prevState.dailyGoal = {} }));
    }
    render() {
        return (
            <td className={(this.props.yes === "yes") ? `day ${this.state.dailyGoal.status}` : "day"} 
                onClick={()=>this.props.click(this.props.element, this.state.dailyGoal.status)}>
                    {this.props.dateString}
            </td>
        );
    }
}


class Details extends Component {
    componentWillUnmount(){
        //clear details
    };
    render() {
        return (
            <div className={this.props.calendarState.showDETAILS ? "detail-container flex-2 display-block" : "detail-container flex-2"}>
                <div className="details row">
                    <h6 className="detailsHeading">Day {this.props.calendarState.selectedDay.dayOfMonth}</h6>
                    <div className="detailImg" style={{ backgroundImage: `url(${idleF})` }}></div>
                    <div className="row yes-no-container">
                        <button type="button" onClick={()=>this.props.click('complete')} className="btn1 green"><i className="fas fa-check"></i></button>
                        <button type="button" onClick={()=>this.props.click('incomplete')} className="btn1 red"><i className="fas fa-times"></i></button>
                    </div>
                </div>
                <div className="">Was today Successful?</div>
            </div>
        );
    }
}

Calendar.propTypes = {
    addGoal: propTypes.func.isRequired,
}
  
const mapStateToProps = (state) => ({
    goal: state.goal
});
  

export default connect(mapStateToProps, { addGoal })(withRouter(Calendar));