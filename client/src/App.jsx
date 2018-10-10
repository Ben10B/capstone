import React, { Component } from 'react';
import './css/App.css';
import './BENstrap-in/css/my.css';
import Home from './components/Home';
import Account from './components/Account';
import Sprite from './components/Sprite';
import Model from './components/Model';
import Achievements from './components/Achievements';
// import propTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { logoutUser } from './actions/authActions';
import Header from './components/Header.jsx';

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

// App.propTypes = {
//   logoutUser: propTypes.func.isRequired,
//   auth: propTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps, { logoutUser })(App);
export default App;
