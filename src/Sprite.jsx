import React, { Component } from 'react';
import './App.css';
import './BENstrap-in/css/my.css';
class Sprite extends Component {
    render() {
        return (
            <div className={`App-intro${this.props.appState.theme} pad-top-1`}>
                <h1>Sprite</h1>
            </div>
        );
    }
}
  
export default Sprite;