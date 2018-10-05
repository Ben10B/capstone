import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
// import logo from './logo.svg';
import logo from './Assets/img/R. 2.svg';
import './App.css';
import './BENstrap-in/css/my.css';
import Home from './Home.jsx';
import Account from './Account';
import Sprite from './Sprite.jsx';
import Model from './Model.jsx';
import Achievements from './Achievements.jsx';

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
          onClick={() => {this.togglePage(0, this.state.active[0][0])}}>
            <i className="fas fa-home"></i>
            <Link to="/app">Home</Link>
          </li>
          <li className={this.state.active[1][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.togglePage(1, this.state.active[1][0])}}>
            <i className="fas fa-user-circle"></i>
            <Link to="/account">My Account</Link>
          </li>
          <li className={this.state.active[2][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.togglePage(2, this.state.active[2][0])}}>
            <i className="fas fa-user"></i>
            <Link to="/sprite">My Sprite</Link>
          </li>
          <li className={this.state.active[3][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.togglePage(3, this.state.active[3][0])}}>
            <i className="fab fa-buromobelexperte"></i>
            <Link to="/model">Fogg Model</Link>
          </li>
          <li className={this.state.active[4][0] ? `pageOpt active` : `pageOpt`} 
          onClick={() => {this.togglePage(4, this.state.active[4][0])}}>
            <i className="fas fa-trophy"></i>
            <Link to="/rewards">Achievements</Link>
          </li>
          <li className='pageOpt'><Link to="./">Logout</Link></li>
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
    const routes = [
      {
        path: "/",
        exact: true,
        main: () => <Home appState={this.state}/>
      },
      {
        path: "/account",
        main: () => <Account appState={this.state} click={this.selectTheme}/>
      },
      {
        path: "/sprite",
        main: () => <Sprite appState={this.state}/>
      },
      {
        path: "/model",
        main: () => <Model appState={this.state}/>
      },
      {
        path: "/rewards",
        main: () => <Achievements appState={this.state}/>
      }
    ];
    return (
      <Router>
        <div className="App">
          <Header appState={this.state} click={this.selectPage}/>
          {/* <Body appState={this.state} click={this.selectTheme}/> */}
          
            {routes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact} component={route.main}/>
            ))}
        </div>
      </Router>
    );
  }
}

export default App;
