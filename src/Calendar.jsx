import React, { Component } from 'react';
import './calendar.css';

export default class Calendar extends Component{
    constructor(props){
        super(props);
        let d = new Date();
        this.state = {
            currentMonth: d.getMonth(),
            currentYear: d.getFullYear(),
            currentDay: d.getDate(),
            days: [],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthIndex: d.getMonth(),
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
    getDays = (currentMonth, currentYear) => {
        let date = new Date();
        if(currentMonth === -1){ currentYear--; currentMonth = 11; }
        if(currentMonth === 12){ currentYear++; currentMonth = 0; }
        date = new Date(currentYear, currentMonth, 1);
        
        let i = 0;
        let tempDays = [];
        while (date.getMonth() === currentMonth) {
            if(i === 0) tempDays = this.addSpace(date);
            tempDays.push(<Day key={i} dateString={new Date(date).toUTCString().substring(4, 7)}/>);
            date.setDate(date.getDate() + 1);
            i++;
        }
        this.setState({ days: tempDays });
        this.setState({ monthIndex: currentMonth });
        this.setState({ currentYear: currentYear });
    };
    addSpace = (date) => {
        let weekdays = {
            'Sat': 6, 'Fri': 5, 'Thu': 4, 'Wed': 3, 'Tue': 2, 'Mon': 1,
        };
        let temp = [];
        for(let key in weekdays){
            if(new Date(date).toUTCString().substring(0, 3).toString() === key){
                for(let d=0; d < weekdays[key]; d++){
                    temp.push(<Day key={`space${d}`}/>);
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
            </div>
        );
    }
}
class Day extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: ["complete", "incomplete", "unresolved", "inactive"],
            statusIndex: 3,
        }
        // this.updateStatus = this.updateStatus.bind(this);
    }
    updateStatus(){
        return this.state.status[this.state.statusIndex];
    };
    componentDidMount(){
        this.determineStatus();
    };
    componentWillUnmount(){
        //clear details
    };
    determineStatus(){
        let d = this.props.dateString;
        let thisDay = parseInt(d, 10);
        let date = new Date();
        
        if(thisDay < date.getDate())
            this.setState({ statusIndex: 2 });
        else if(thisDay > date.getDate()) 
            this.setState({ statusIndex: 3 });
        else if(thisDay === date.getDate()){
            this.setState({ statusIndex: 0 });
        }
    };
    showDetails = () => {
    };
    render() {
        return (
            // <td className={`day ${this.updateStatus}`} 
            <td className={`day ${this.state.status[this.state.statusIndex]}`} 
            onClick={this.showDetails}>{this.props.dateString}
                
            </td>
        );
    }
}
class Details extends Component {
    render() {
        return (
            <div className="detail-container"></div>
        );
    }
}