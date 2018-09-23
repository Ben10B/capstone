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
    active: false,
  };
  toggleClass = (isActive) => {
    this.setState({ active: !isActive });
  };
  render(){
    return(
      <header className={this.state.active ? "App-header" : "App-header-close"}>
        <img src={logo} alt="logo" className="App-logo"  
        onClick={() => this.toggleClass(this.state.active)} />
        <h1 className="App-title">Grindin'</h1>
        <ul>
          <li onClick={() => this.props.click('home')} class="active"><a>Home</a></li>
          <li onClick={() => this.props.click('profile')}><a>My Profile</a></li>
          <li onClick={() => this.props.click('sprite')}><a>Customize Sprite</a></li>
          <li onClick={() => this.props.click('model')}><a>Fogg Model</a></li>
          <li onClick={() => this.props.click('rewards')}><a>Achievements</a></li>
        </ul>
      </header>
    )
  }
}


class Body extends Component {
  constructor(props){
    super(props);
  }
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
