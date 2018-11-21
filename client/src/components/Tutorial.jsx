import React, { Component } from 'react';
import '../css/tutorial.css';
import SelectListGroup from './common/SelectListGroup';
import moment from 'moment';

export default class Tutorial extends Component {
  state = { teach: '', }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    // Select tutorial options
    const options = [
      { label: '* Select subject', value: 0 },
      { label: 'Title', value: 'Title' },
      { label: 'Description', value: 'Description' },
      { label: 'Difficulty', value: 'Difficulty' },
      { label: 'Estimated End Date', value: 'Date' },
      { label: 'Days of the Week', value: 'Days' },
      { label: 'Friendly Fire', value: 'FF' },
    ];
    let selectedSubject;
    switch(this.state.teach){
      case 'Title': selectedSubject = <Title/>; break;
      case 'Description': selectedSubject = <Description/>; break;
      case 'Difficulty': selectedSubject = <Difficulty/>; break;
      case 'Date': selectedSubject = <Date/>; break;
      case 'Days': selectedSubject = <Days/>; break;
      case 'FF': selectedSubject = <FriendlyFire/>; break;
      default: selectedSubject = <div></div>; break;
    }
    return (
      <div className={`App-intro${this.props.appState.theme} pad-top-1`}>
        <h1>Tutorial</h1>
        <div id="subjectSelection" className="flex-1">
          <SelectListGroup
            placeholder="teach"
            name="teach"
            value={this.state.teach}
            onChange={this.onChange}
            options={options}
            info="Pick a subject to learn more!"
          />
        </div>
        {selectedSubject}
      </div>
    );
  }
}

const Title = () => {
  return (
    <div className="subjectContainer flex-9">
      <h4>BE SPECIFIC<strong>.</strong></h4>
      <div>
        <p><i className="fas fa-times"></i> "Write a book"</p>
        <p><i className="fas fa-check"></i> "Write a comedy romance book"</p>
      </div>
      <details>
        <summary>Click for more details</summary>
        Setting a goal that’s too broad will be difficult to gauge success. 
        This may happen when a person doesn’t really know what they want or how to set a goal properly. 
        For example, “I want to write a book” is too general.
        Instead, narrow it down - "I want to write a comedy romance book" is more specific.
        When you name your goal, type "Write a comedy romance book".
        <hr/>
        The name you give will be seen on the dashboard and every time you view your goal.
      </details>
      <strong>Note: Title must be between 2 and 30 characters.</strong>
    </div>
  )
}
const Description = () => {
  return (
    <div className="subjectContainer flex-9">
      <h4>BE HONEST &amp; DESCRIPTIVE<strong>.</strong></h4>
      <div>
        <p><i className="fas fa-times"></i> "I will write 5 chapters a week."</p>
        <p><i className="fas fa-check"></i> "I will write 1 chapter a week."</p>
      </div>
      <details>
        <summary>Click for more details</summary> 
        This comes down with what you're capable of doing currently.
        It takes baby steps before you can jump.
        Next, explain the steps you'll take to reach your goal.
        If you can write 5 chapters a week, awesome!
        <hr/>
        Your description will be seen every time you view your goal. 
        This way, you won't forget what you're doing. 
      </details>
      <strong>Note: Description must be between 10 and 100 characters.</strong>
    </div>
  )
}
const Difficulty = () => {
  return (
    <div className="subjectContainer flex-9">
      <h4>BE CAREFUL<strong>.</strong></h4>
      <div>
        <p><i className="fas fa-times"></i> Empty</p>
        <p><i className="fas fa-check"></i> Easy, Medium, or Hard</p>
      </div>
      <details>
        <summary>Click for more details</summary>
        This plays into the whole game element of the website. 
        <hr/>
        The higher the difficulty, the more damage, gold, and experience you receive!
      </details>
      <strong>Note: One difficulty must be selected.</strong>
    </div>
  )
}
const Date = () => {
  return (
    <div className="subjectContainer flex-9">
      <h4>BE PRECISE<strong>.</strong></h4>
      <div>
        <p><i className="fas fa-times"></i> Prior to {moment().format('MMM Do YY')}</p>
        <p><i className="fas fa-check"></i> {moment().format('MMM Do YY')} and Onwards</p>
      </div>
      <details>
        <summary>Click for more details</summary>
        It may be difficult to know when to finish. 
        That's okay. 
        <hr/>
        You can view your progress on a calender every time you view your goal.
      </details>
      <strong>Note: Date can start from current day to 60 days from now.</strong>
    </div>
  )
}
const Days = () => {
  return (
    <div className="subjectContainer flex-9">
      <h4>BE PICKY<strong>.</strong></h4>
      <div>
        <p><i className="fas fa-times"></i> Empty</p>
        <p><i className="fas fa-check"></i> Su, M, T, W, Th, F, and/or Sa</p>
      </div>
      <details>
        <summary>Click for more details</summary>
        Choose the days you feel comfortable to work on. 
        <hr/>
        You will be able to update each day every time you view your goal.
      </details>
      <strong>Note: Depending on duration of goal, selected days will repeat.</strong>
    </div>
  )
}
const FriendlyFire = () => {
  return (
    <div className="subjectContainer flex-9">
      <h4>BE FRIENDLY<strong>.</strong></h4>
      <div>
        <p><i className="fas fa-times"></i> You want to work alone.</p>
        <p><i className="fas fa-check"></i> You have partners.</p>
      </div>
      <details>
        <summary>Click for more details</summary>
        Choose to either go solo or in a squad. 
        <hr/>
        With friendly fire ON, your friends are allowed to update the goal.
        With friendly fire OFF, your friends can't update the goal; they are your motivators.
        If friendly fire is ON, your friends will recieve the same rewards you do.
        If friendly fire is OFF, your friends won't recieve the same rewards you do.
      </details>
      <strong>Note: You can only recruit your friends.</strong>
    </div>
  )
}