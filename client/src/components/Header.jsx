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
    active: [[true, 1], [false, 0], [false, 0], [false, 0], [false, 0], [false, 0], [false, 0], [false, 0]],
    closed: false,
    titles: ['Home', 'My Account', 'My Sprite', 'Fogg Model', 'Tutorial', 'Achievements', 'View Profiles', 'Feed', 'Logout'],
    
  };
  
  componentDidMount(){
    if(this.props.profile.profile !== null && this.props.profile.profile.theme !== undefined){
      this.props.renderTheme(this.props.profile.profile.theme);
    }
  }
  toggleHeader = (isClosed) => {
    this.setState({ closed: !isClosed });

    const titles = this.state.titles;
    if(!isClosed){
      for(let i = 0; i < this.state.titles.length; i++){
        this.setState({ [`tempTitles${i}`]: titles[i] });
        titles[i] = '';
      }
    }else{
      for(let i = 0; i < this.state.titles.length; i++){
        titles[i] = this.state[`tempTitles${i}`];
      }
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
  onfeedClick = (e) => {
    e.preventDefault();
    this.props.history.push('/feed');
  }
  onProfilesClick = (e) => {
    e.preventDefault();
    this.props.history.push('/profiles');
  }
  render(){
    const { profile } = this.props.profile;
    let privateLinks;
    
    if(profile !== null && Object.keys(profile).length > 0){
      privateLinks = (<div>
          <li className={this.state.active[0][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.props.click('home'); this.togglePage(0, this.state.active[0][0])}}>
            <div><i className="fas fa-home"></i> {this.state.titles[0]}</div>
          </li>
          <li className={this.state.active[1][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.props.click('account'); this.togglePage(1, this.state.active[1][0])}}>
            <div id="step2"><i className="fas fa-user-circle"></i> {this.state.titles[1]}</div>
          </li>
          <li className={this.state.active[2][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.props.click('sprite'); this.togglePage(2, this.state.active[2][0])}}>
            <div id="step3"><i className="fas fa-user"></i> {this.state.titles[2]}</div>
          </li>
          <li className={this.state.active[3][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.props.click('model'); this.togglePage(3, this.state.active[3][0])}}>
            <div id="step4"><i className="fas fa-flask"></i> {this.state.titles[3]}</div>
          </li>
          <li className={this.state.active[4][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.props.click('teach'); this.togglePage(4, this.state.active[4][0])}}>
            <div id="step5"><i className="fas fa-list-ol"></i> {this.state.titles[4]}</div>
          </li>
          <li className={this.state.active[5][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.props.click('rewards'); this.togglePage(5, this.state.active[5][0])}}>
            <div id="step6"><i className="fas fa-trophy"></i> {this.state.titles[5]}</div>
          </li>
          <li className={this.state.active[6][0] ? `pageOpt active` : `pageOpt`} 
          onClick={this.onProfilesClick.bind(this)}>
            <div id="step7"><i className="fas fa-users"></i> {this.state.titles[6]}</div>
          </li>
          <li className={this.state.active[7][0] ? `pageOpt active` : `pageOpt`}
          onClick={this.onfeedClick.bind(this)}>
            <div id="step8"><i className="fas fa-comments"></i> {this.state.titles[7]}</div>
          </li>
      </div>)
    }
    return(
      <header id="Header" className={this.state.closed ? `App-header-close${this.props.appState.theme}` : `App-header${this.props.appState.theme}`}>
        <h1 className="App-title res-fnt-size-2">Grindin'</h1>
        <img src={logo} alt="logo" className="App-logo"  
        onClick={() => this.toggleHeader(this.state.closed)} />
        <ul>
          {privateLinks}
          <li className={`pageOpt`} 
          onClick={this.onLogoutClick.bind(this)}>
            <div><i className="fas fa-sign-out-alt"></i> {this.state.titles[8]}</div>
          </li>
        </ul>
      </header>
    )
  }
}

Header.propTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(withRouter(Header));