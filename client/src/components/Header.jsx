import React, { Component } from 'react';
// import logo from './logo.svg';
import logo from '../Assets/img/R. 2.svg';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { withRouter } from 'react-router-dom';
import { clearCurrentProfile } from '../actions/profileActions';

class Header extends Component {
  state = {
    active: [[true, 1], [false, 0], [false, 0], [false, 0], [false, 0], [false, 0]],
    closed: false,
    titles: ['Home', 'My Account', 'My Sprite', 'Fogg Model', 'Achievements', 'Logout'],
  };
  toggleHeader = (isClosed) => {
    this.setState({ closed: !isClosed });

    const titles = this.state.titles;
    if(!isClosed){
      for(let i = 0; i < this.state.titles.length; i++){
        titles[i] = '';
      }
    }else{
      titles[0]='Home'; titles[1]='My Account'; titles[2]='My Sprite'; titles[3]='Fogg Model'; titles[4]='Achievements'; titles[5]='Logout';
    }
    this.setState({titles: titles});
  }
  togglePage = (index, isActive) => {
    const activeArray = this.state.active;
    for (let i = 0; i < activeArray.length; i++) {
      if(i !== index){ activeArray[i][0] = false; activeArray[i][1] = 0; }
    }
    if(activeArray[index][1] === 0){
      activeArray[index][0] = !isActive;
      activeArray[index][1] = 1;
    }
    this.setState({ active: activeArray });
  }
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser(this.props.history);
  }
  render(){
    return(
      <header className={this.state.closed ? `App-header-close${this.props.appState.theme}` : `App-header${this.props.appState.theme}`}>
        <h1 className="App-title res-fnt-size-2">Grindin'</h1>
        <img src={logo} alt="logo" className="App-logo"  
        onClick={() => this.toggleHeader(this.state.closed)} />
        <ul>
          <li className={this.state.active[0][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.props.click('home'); this.togglePage(0, this.state.active[0][0])}}>
            <i className="fas fa-home"></i>
            <a>{this.state.titles[0]}</a>
          </li>
          <li className={this.state.active[1][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.props.click('account'); this.togglePage(1, this.state.active[1][0])}}>
            <i className="fas fa-user-circle"></i>
            <a>{this.state.titles[1]}</a>
          </li>
          <li className={this.state.active[2][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.props.click('sprite'); this.togglePage(2, this.state.active[2][0])}}>
            <i className="fas fa-user"></i>
            <a>{this.state.titles[2]}</a>
          </li>
          <li className={this.state.active[3][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.props.click('model'); this.togglePage(3, this.state.active[3][0])}}>
            <i className="fab fa-buromobelexperte"></i>
            <a>{this.state.titles[3]}</a>
          </li>
          <li className={this.state.active[4][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.props.click('rewards'); this.togglePage(4, this.state.active[4][0])}}>
            <i className="fas fa-trophy"></i>
            <a>{this.state.titles[4]}</a>
          </li>
          <li className={`pageOpt`} 
          onClick={this.onLogoutClick.bind(this)}>
            <i className="fas fa-sign-out-alt"></i>
            <a>{this.state.titles[5]}</a>
          </li>
        </ul>
      </header>
    )
  }
}

Header.propTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(withRouter(Header));