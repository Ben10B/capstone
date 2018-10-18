import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGoal } from '../actions/goalActions';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from './common/TextFieldGroup';
import moment from 'moment';

class CreateGoal extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            difficulty: '',
            partners: {},
            date: null,
            sun: false,
            mon: false,
            tue: false,
            wed: false,
            th: false,
            fri: false,
            sat: false,
            errors: {}

        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onCheck = (e) => {
        // if(e.target.checked === true)
            this.setState({ [e.target.name]: e.target.value });
        // else
        //     this.setState({ [e.target.name]: null });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const goalData = {
            title: this.state.title,
            description: this.state.description,
            difficulty: this.state.difficulty,
            partners: this.state.partners,
            date: this.state.date,
            sun: (this.state.sun) ? 0 : 88,
            mon: (this.state.mon) ? 1 : 88,
            tue: (this.state.tue) ? 2 : 88,
            wed: (this.state.wed) ? 3 : 88,
            th: (this.state.th) ? 4 : 88,
            fri: (this.state.fri) ? 5 : 88,
            sat: (this.state.sat) ? 6 : 88,
        };
        this.calendar(goalData.date);
        // console.log(moment().format());
        
        // this.props.addGoal(goalData, this.props.history);
    }
    calendar = (endDate) => {
        let current = new Date();
        let cMonth = current.getMonth();
        let cYear = current.getFullYear();
        let cDay = current.getDate();

        let a = moment(new Date(cYear, cMonth, cDay), 'YYYY-MM-DD');
        let b = moment(endDate, 'YYYY-MM-DD');
        let days = b.diff(a, 'days');
        
        let i = 0;
        let tempArray = [];
        tempArray.push({ status: "inactive", date: a, dayOfMonth: a.date(), });
        while(i < days){
            let newDate = a.add(1, 'days');
            tempArray.push({ 
                status: "inactive", 
                date: newDate, 
                dayOfMonth: newDate.date(), 
            });
            console.log(newDate.date());
            i++;
        }
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="column">
                <div className="row">
                    <span>
                        <h1>Goal Creation</h1>
                    </span>
                    <button type="button" className="btn1" onClick={this.props.click}>Back to Dashboard</button>
                </div>
                <div>
                    <form className="column" noValidate onSubmit={this.onSubmit}>
                        <TextFieldGroup name="title"
                            placeholder="TITLE"
                            value={this.state.title} onChange={this.onChange}
                            error={errors.title}
                        />
                        {errors.title && (<div className="err invalid-feedback">{errors.title}</div>)}
                        <TextFieldGroup name="description"
                            placeholder="DESCRIPTION"
                            value={this.state.description} onChange={this.onChange}
                            error={errors.description}
                        />
                        {errors.description && (<div className="err invalid-feedback">{errors.description}</div>)}
                        <label className="margn-top-1">DIFFICULTY</label>
                        <div className="row" style={{display: 'flex', flexDirection: 'row'}} error={errors.difficulty}>
                            <p><input type="radio" name="difficulty" value="1" onChange={this.onChange}/>Easy</p>
                            <p><input type="radio" name="difficulty" value="2" onChange={this.onChange}/>Medium</p>
                            <p><input type="radio" name="difficulty" value="3" onChange={this.onChange}/>Hard</p>
                        </div>
                        {errors.difficulty && (<div className="err invalid-feedback">{errors.difficulty}</div>)}
                        <label>Estimated End Date</label>
                        <input name="date" type="date" onChange={this.onChange} error={errors.date}/>
                        {errors.date && (<div className="err invalid-feedback">{errors.date}</div>)}
                        <label>Check DAY(s) you plan to grind.</label>
                        <div className="row" style={{display: 'flex', flexDirection: 'row'}} error={errors.daysOftheWeek}>
                            <p><input type="checkbox" name="sun" onChange={this.onCheck} value="0"/>Sun</p>
                            <p><input type="checkbox" name="mon" onChange={this.onCheck} value="1"/>Mon</p>
                            <p><input type="checkbox" name="tue" onChange={this.onCheck} value="2"/>Tue</p>
                            <p><input type="checkbox" name="wed" onChange={this.onCheck} value="3"/>Wed</p>
                            <p><input type="checkbox" name="th" onChange={this.onCheck} value="4"/>Th</p>
                            <p><input type="checkbox" name="fri" onChange={this.onCheck} value="5"/>Fri</p>
                            <p><input type="checkbox" name="sat" onChange={this.onCheck} value="6"/>Sat</p>
                        </div>
                        {errors.daysOftheWeek && (<div className="err invalid-feedback">{errors.daysOftheWeek}</div>)}
                        <input className="btn1" type="submit" value="CREATE GOAL" />
                    </form>
                </div>
            </div>
        )
    }
}

CreateGoal.propTypes = {
    addGoal: propTypes.func.isRequired,
    goal: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
  }
  
const mapStateToProps = (state) => ({
    goal: state.goal,
    errors: state.errors  
  });
  
export default connect(mapStateToProps, { addGoal })(withRouter(CreateGoal));