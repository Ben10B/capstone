import React, { Component } from 'react';
import '../css/tutorial.css';
class Tutorial extends Component {
    render() {
        return (
            <div className={`App-intro${this.props.appState.theme} pad-top-1`}>
                <h1>Tutorial</h1>
            </div>
        );
    }
}
  
export default Tutorial;