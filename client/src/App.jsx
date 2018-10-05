import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
// import logo from './logo.svg';
import logo from './Assets/img/R. 2.svg';
import './css/App.css';
import './BENstrap-in/css/my.css';
import Home from './components/Home';
import Account from './components/Account';
import Sprite from './components/Sprite';
import Model from './components/Model';
import Achievements from './components/Achievements';

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
          <li><Link to="./login"><a className='fnt-white'>{this.state.titles[5]}</a></Link></li>
        </ul>
      </header>
    )
  }
}

class Body extends Component {
  state = {}
  render(){
    if(this.props.appState.page === 'account'){
      return <Account appState={this.props.appState} click={this.props.click}/>;
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
    return (
      <Home appState={this.props.appState}/>
    )
  }
}

class App extends Component {
  state = {
    page: '',
    theme: '',
  }
  selectPage = (link) => {
    this.setState({ page: link });
  }
  selectTheme = (t) => {
    this.setState({ theme: t });
  }
  render() {
    return (
      <div className="App">
        <Header appState={this.state} click={this.selectPage}/>
        <Body appState={this.state} click={this.selectTheme}/>
      </div>
    );
  }
}

export default App;
