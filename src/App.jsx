import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './BENstrap-in/css/my.css';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Sprite from './Sprite.jsx';
import Model from './Model.jsx';
import Achievements from './Achievements.jsx';

class Header extends Component {
  state = {
    active: [[true, 1], [false, 0], [false, 0], [false, 0], [false, 0]],
    closed: false
  };
  toggleHeader = (isClosed) => {
    this.setState({ closed: !isClosed });
  };
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
  };
  render(){
    return(
      <header className={this.state.closed ? "App-header-close" : "App-header"}>
        <h1 className="App-title">Grindin'</h1>
        <img src={logo} alt="logo" className="App-logo"  
        onClick={() => this.toggleHeader(this.state.closed)} />
        <ul>
          <li className={this.state.active[0][0] ? "pageOpt active" : "pageOpt"} 
          onClick={() => {this.props.click('home'); this.togglePage(0, this.state.active[0][0])}}><a>Home</a></li>
          <li className={this.state.active[1][0] ? "pageOpt active" : "pageOpt"} 
          onClick={() => {this.props.click('profile'); this.togglePage(1, this.state.active[1][0])}}><a>My Profile</a></li>
          <li className={this.state.active[2][0] ? "pageOpt active" : "pageOpt"} 
          onClick={() => {this.props.click('sprite'); this.togglePage(2, this.state.active[2][0])}}><a>Customize Sprite</a></li>
          <li className={this.state.active[3][0] ? "pageOpt active" : "pageOpt"} 
          onClick={() => {this.props.click('model'); this.togglePage(3, this.state.active[3][0])}}><a>Fogg Model</a></li>
          <li className={this.state.active[4][0] ? "pageOpt active" : "pageOpt"} 
          onClick={() => {this.props.click('rewards'); this.togglePage(4, this.state.active[4][0])}}><a>Achievements</a></li>
        </ul>
      </header>
    )
  }
}


class Body extends Component {
  render(){
    if(this.props.page === 'profile'){
      return <Profile/>;
    }
    else if(this.props.page === 'sprite'){
      return <Sprite/>;
    }
    else if(this.props.page === 'model'){
      return <Model/>;
    }
    else if(this.props.page === 'rewards'){
      return <Achievements/>;
    }
    return (
      <Home/>
    )
  }
}

class App extends Component {
  state = {
    page: '',
  }
  selectPage = (link) => {
    this.setState({ page: link });
  }
  render() {
    return (
      <div className="App">
        <Header click={this.selectPage}/>
        <Body page={this.state.page}/>
      </div>
    );
  }
}

export default App;
