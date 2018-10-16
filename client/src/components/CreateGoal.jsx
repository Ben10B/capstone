import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGoal } from '../actions/goalActions';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from './common/TextFieldGroup';

class CreateGoal extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            difficulty: '',
            health: 10,
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
        this.setState({ [e.target.name]: e.target.checked });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const goalData = {
            title: this.state.title,
            description: this.state.description,
            difficulty: this.state.difficulty,
            health: this.state.health,
            partners: this.state.partners,
            date: this.state.date,
            sun: this.state.sun,
            mon: this.state.mon,
            tue: this.state.tue,
            wed: this.state.wed,
            th: this.state.th,
            fri: this.state.fri,
            sat: this.state.sat,
        };
        this.props.addGoal(goalData, this.props.history);
    }
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
                            <p><input type="checkbox" name="sun" onChange={this.onCheck}/>Sun</p>
                            <p><input type="checkbox" name="mon" onChange={this.onCheck}/>Mon</p>
                            <p><input type="checkbox" name="tue" onChange={this.onCheck}/>Tue</p>
                            <p><input type="checkbox" name="wed" onChange={this.onCheck}/>Wed</p>
                            <p><input type="checkbox" name="th" onChange={this.onCheck}/>Th</p>
                            <p><input type="checkbox" name="fri" onChange={this.onCheck}/>Fri</p>
                            <p><input type="checkbox" name="sat" onChange={this.onCheck}/>Sat</p>
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