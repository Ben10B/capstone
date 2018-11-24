import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Push from 'push.js';
import './css/App.css';
import './BENstrap-in/css/my.css';
import Home from './components/Home';
import Account from './components/Account';
import Sprite from './components/Sprite';
import Model from './components/Model';
import Tutorial from './components/Tutorial';
import Achievements from './components/Achievements';
import Header from './components/Header.jsx';
import Spinner from './components/common/Spinner.jsx';
import { Steps } from 'intro.js-react';
import './css/introjs.css';
import './css/introjs-dark.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount, finishedTour } from './actions/profileActions';

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
    else if(this.props.appState.page === 'teach'){
      return <Tutorial appState={this.props.appState}/>;
    }
    else if(this.props.appState.page === 'rewards'){
      return <Achievements appState={this.props.appState}/>;
    }
    // else if(this.props.appState.page === 'profiles'){
    //   return <Profiles profile={this.props.profile} appState={this.props.appState}/>;
    // } 

    this.props.profile.friends.forEach(person => {
      if(person.request){
        Push.create("New Friend Request", {
          body: `${person.profile.handle} wants to be your friend.`,
          timeout: 4000,
        });
      }
    });
    return (
      <Home profile={this.props.profile} appState={this.props.appState}/>
    )
  }
}

class App extends Component {
  state = {
    page: '',
    theme: '',
    stepsEnabled: true,
    initialStep: 0,
    steps: [
      { intro: 'Welcome! Take a quick tour?', },
      { element: '#step1',
        intro: 'Click on this button to create a goal.',
        tooltipPosition: 'auto', },
      { element: '#goalList',
        intro: 'Your goals that you create will appear here.',
        tooltipPosition: 'auto', },
      { element: '#step2',
        intro: 'Click to edit your account and friends.',
        tooltipPosition: 'auto', },
      { element: '#step3',
        intro: 'Click to edit your character.',
        tooltipPosition: 'auto', },
      { element: '#step4',
        intro: "Click to view BJ Fogg's behavior model.",
        tooltipPosition: 'auto', },
      { element: '#step5',
        intro: 'Click to learn how properly create a goal and other things.',
        tooltipPosition: 'auto', },  
      { element: '#step6',
        intro: 'Click to view your achievements.',
        tooltipPosition: 'auto', },
      { element: '#step7',
        intro: 'Click to see other people that are Grindin.',
        tooltipPosition: 'auto', },
      { element: '#step8',
        intro: 'Click to go on a public comment thread.',
        tooltipPosition: 'auto', },
      { intro: 'This concludes the end of the tour. Thank you for registering and trying to improve yourself!', }
    ],
  }
  
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick = (e) => {
    this.props.deleteAccount();
  }
  selectPage = (link) => {
    this.setState({ page: link });
  }
  selectTheme = (t) => {
    this.setState({ theme: t });
  }
  renderTheme = (t) => {
    this.setState({ theme: t });
  }
  onExit = () => {
    this.setState(() => ({ stepsEnabled: false }));
    this.props.finishedTour();
  }
  onComplete = () => {
    this.setState(() => ({ stepsEnabled: false }));
    this.props.finishedTour();
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
            {profile.tourFinished ? '' : (
              <Steps
                enabled={this.state.stepsEnabled}
                steps={this.state.steps}
                initialStep={this.state.initialStep}
                onComplete={this.onComplete}
                onExit={this.onExit}
                options={{disableInteraction: true,
                  showBullets: true,
                  showProgress: true,
                  exitOnOverlayClick: false,
                  overlayOpacity: .3,
                  doneLabel: "Complete",
                  skipLabel: "I'll figure it out."
                }}
              />
            )}
            <Header appState={this.state} click={this.selectPage} renderTheme={this.renderTheme}/>
            <Body appState={this.state} profile={profile} click={this.selectTheme} deleteAccountClick={this.onDeleteClick}/>
          </div>
        )
      } else {
        //User is logged in but has no profile
        grindinContent = (
          <div className="App">
            <Header appState={this.state} click={this.selectPage} renderTheme={this.renderTheme}/>
            <div className={`App-intro${this.state.theme} no-profile-container`}>
              <h1>Welcome to Grindin' Goals!</h1>
              <p className="margn-5">The purpose of this application is to help you stay motivated in completing your
                goals with a gaming element to it. You don't have to do it alone though. 
                Your friends can join you along the way!
                <h6 className="margn-top-2">Let's Start GRINDIN'!!</h6>
              </p>
              <Link className="likeBTN margn-1 button" to="/create-profile">Click to Create a Profile</Link>
            </div>
          </div>
        )
      }
    }

    return (
      <div id="level2">
        {grindinContent}
      </div>
    );
  }
}
App.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  finishedTour: propTypes.func.isRequired,
  deleteAccount: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, finishedTour })(App);
