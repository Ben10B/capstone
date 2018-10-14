import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/App.css';
import './BENstrap-in/css/my.css';
import Home from './components/Home';
import Account from './components/Account';
import Sprite from './components/Sprite';
import Model from './components/Model';
import Achievements from './components/Achievements';
import Header from './components/Header.jsx';
import Profiles from './components/profiles/Profiles.jsx';
import Spinner from './components/common/Spinner.jsx';

import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from './actions/profileActions';

class Body extends Component {
  render(){
    if(this.props.appState.page === 'account'){
      return <Account appState={this.props.appState} click={this.props.click} onDeleteClick={this.props.deleteAccountClick}/>;
    }
    else if(this.props.appState.page === 'sprite'){
      return <Sprite appState={this.props.appState}/>;
    }
    else if(this.props.appState.page === 'model'){
      return <Model appState={this.props.appState}/>;
    }
    else if(this.props.appState.page === 'rewards'){
      return <Achievements appState={this.props.appState}/>;
    }
    else if(this.props.appState.page === 'profiles'){
      // return <div></div>;
      return <Profiles profile={this.props.profile} appState={this.props.appState}/>;
    } 
    return (
      <Home profile={this.props.profile} appState={this.props.appState}/>
    )
  }
}

class App extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick = (e) => {
    this.props.deleteAccount();
  }
  state = {
    page: '',
    theme: ''
  }
 
  selectPage = (link) => {
    this.setState({ page: link });
  }
  selectTheme = (t) => {
    this.setState({ theme: t });
  }
  render() {
    // const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let grindinContent;
    if(profile === null || loading) {
      grindinContent = <Spinner/>
    } else { 
      //Check if logged in user has profile data
      if(Object.keys(profile).length > 0){
        grindinContent = (
          <div className="App">
            <Header appState={this.state} click={this.selectPage}/>
            <Body appState={this.state} profile={profile} click={this.selectTheme} deleteAccountClick={this.onDeleteClick}/>
          </div>
        )
      } else {
        //User is logged in but has no profile
        //TODO: use Tutorial.js
        grindinContent = (
          <div className="App">
            <Header appState={this.state} click={this.selectPage}/>
            <div className="flex-8">
              <Link to="/create-profile">Create Profile</Link>
            </div>
          </div>
        )
      }
    }

    return (
      <div>
        {grindinContent}
      </div>
    );
  }
}
App.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  deleteAccount: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(App);
