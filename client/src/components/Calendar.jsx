import React, { Component } from 'react';
import '../css/calendar.css';
import idleF from '../Assets/img/Idle-Female.gif';

export default class Calendar extends Component{
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
            statusIndex: undefined,
        }
        this.switchMonths = this.switchMonths.bind(this);
    }
    componentDidMount() { 
        this.getDays(this.state.currentMonth, this.state.currentYear);
        document.getElementById('the-month').innerHTML = this.state.months[this.state.monthIndex];
        document.getElementById('the-year').innerHTML = this.state.currentYear;
    };componentWillUnmount() { };

    switchMonths = (index) => {
        let monthIndex = this.state.monthIndex;
        let newIndex = monthIndex += index;
        this.getDays(this.navigateCalender(newIndex), this.state.currentYear);
    };
    navigateCalender = (index) => {
        let newIndex = 0;
        newIndex = index;

        if (index < 0) index = 11;
        else if (index > 11) index = 0;
        document.getElementById('the-month').innerHTML = this.state.months[index];
        
        return newIndex;
    };
    showDetails = (day) => {
        if(day !== undefined){
            // this.setState({ selectedDay: day }, ()=> { console.log(`state: ${this.state.selectedDay}, value: ${day}`); });
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
        
        let i = 0;
        let tempDays = [];
        while (date.getMonth() === currentMonth) {
            if(i === 0) tempDays = this.addSpace(date);
            tempDays.push(<Day key={i} click={this.showDetails}
                calendarState={this.state} dateString={new Date(date).toUTCString().substring(4, 7)}/>);
            date.setDate(date.getDate() + 1);
            i++;
        }
        this.setState({ days: tempDays });
        this.setState({ monthIndex: currentMonth });
        this.setState({ currentYear: currentYear });
        if(date.getDate() !== this.state.currentDay)
            this.setState({ today: date });
    };
    addSpace = (date) => {
        let weekdays = {
            'Sat': 6, 'Fri': 5, 'Thu': 4, 'Wed': 3, 'Tue': 2, 'Mon': 1,
        };
        let temp = [];
        for(let key in weekdays){
            if(new Date(date).toUTCString().substring(0, 3).toString() === key){
                for(let d=0; d < weekdays[key]; d++){
                    temp.push(<Day key={`space${d}`} click={this.showDetails} calendarState={this.state}/>);
                }
            }
        }
        return temp;
    };
    updateStatus = (status) => {
        // The second (optional) parameter is a callback function that will be executed once setState is completed and the component is re-rendered.
        this.setState({ statusIndex: status }, ()=> { console.log(`state: ${this.state.statusIndex}, value: ${status}`); });
        // this.getDays(this.state.currentMonth, this.state.currentYear);
    };
    
    render() {
        return (
            <div className='calendar-container'>
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
            status: ["complete", "incomplete", "unresolved", "inactive", "today"],
            statusIndex: this.props.calendarState.statusIndex,
        }
    }
    componentWillMount(){
        // this.setState({ statusIndex: this.props.statusIndex });
        // this.determineStatus();
    };
    componentWillUnmount(){
        //clear details
    };
    componentWillReceiveProps(nextProps){
        // console.log(nextProps);
        // console.log(this.props.calendarState.statusIndex);
    };
    determineStatus(){
        let d = this.props.dateString;
        let thisDay = parseInt(d, 10);
        let date = new Date();
        // let month = date.getMonth();
        // let year = date.getFullYear();
        // let date2 = new Date(year, month, thisDay);
        
        //Unresolved: days passed that need to be completed
        if(thisDay <= date.getDate())
            this.setState({ statusIndex: 2 });
        //Inactive: days that have yet to come
        if(thisDay > date.getDate()) 
            this.setState({ statusIndex: 3 });
        //Today
        if(thisDay === this.props.calendarState.today.getDate()){
            // console.log(this.props.calendarState.today);
            this.setState({ statusIndex: 4 });
        }
    };
    render() {
        return (
            // <td className={`day ${this.props.calendarState.statusIndex}`} 
            <td className={`day ${this.state.status[this.state.statusIndex]}`} 
                onClick={()=>this.props.click(this.props.dateString)}>
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
                    <h6 className="detailsHeading">Day {this.props.calendarState.selectedDay}</h6>
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