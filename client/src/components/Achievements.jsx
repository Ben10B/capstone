import React, { Component } from 'react';
import '../css/App.css';
import '../BENstrap-in/css/my.css';
class Achievements extends Component {
    render() {
        return (
            <div className={`App-intro${this.props.appState.theme} pad-top-1`}>
                <h1>Achievements</h1>
                <h4>In Progress..</h4>
            </div>
        );
    }
}
  
export default Achievements;