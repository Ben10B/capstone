import React, { Component } from 'react';
import '../css/App.css';
import '../BENstrap-in/css/my.css';
import def from '../Assets/img/Default-Theme.png';
import theme1 from '../Assets/img/Theme-One.png';
import theme2 from '../Assets/img/Theme-Two.png';
import theme3 from '../Assets/img/Theme-Three.png';
import theme4 from '../Assets/img/Theme-Four.png';
import theme5 from '../Assets/img/Theme-Five.png';

class Account extends Component {
    render() {
        return (
            <div className={`App-intro${this.props.appState.theme} pad-top-1`}>
                <h1 className="flex-2">Account</h1>
                <div className="flex-4">
                    <h3>Name</h3>
                    <h5>Email</h5>
                    <h5>Password</h5>
                    <button onClick={this.props.onDeleteClick.bind(this)} className="btn2">Delete Account</button>
                </div>
                <span className="flex-4">
                    <h6>Choose a Theme</h6>
                    <div className="row">
                        <div className="theme" style={{ background: `url(${def}) center/cover no-repeat` }}
                        onClick={()=>this.props.click('')}>Default</div>
                        <div className="theme" style={{ background: `url(${theme1}) center/cover no-repeat` }}
                        onClick={()=>this.props.click('-theme1')}>Theme One</div>
                        <div className="theme" style={{ background: `url(${theme2}) center/cover no-repeat` }}
                        onClick={()=>this.props.click('-theme2')}>Theme Two</div>
                        <div className="theme" style={{ background: `url(${theme3}) center/cover no-repeat` }}
                        onClick={()=>this.props.click('-theme3')}>Theme Three</div>
                        <div className="theme" style={{ background: `url(${theme4}) center/cover no-repeat` }}
                        onClick={()=>this.props.click('-theme4')}>Theme Four</div>
                        <div className="theme" style={{ background: `url(${theme5}) center/cover no-repeat` }}
                        onClick={()=>this.props.click('-theme5')}>Theme Five</div>
                    </div>
                </span>
            </div>
        );
    }
}
  
export default Account;