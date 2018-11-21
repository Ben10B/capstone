import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpriteByUser } from '../actions/spriteActions';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ViewItem } from './modals/Modals'
import '../css/sprite.css';
import idleM from '../Assets/img/Idle-Male.gif';
import powerUpM from '../Assets/img/PowerUp-Male.gif';
import aura from '../Assets/img/Aura.gif';
import powerUpF from '../Assets/img/PowerUp-Female.gif';
import idleF from '../Assets/img/Idle-Female.gif';
// import item from '../Assets/img/Virtuous.png';

class Sprite extends Component {
  state = {
    showItem: false,
    images: [],
  }
  componentDidMount() {
    var req = require.context("../Assets/img", false, /.*\.*$/);
    let img = [];
    req.keys().forEach(function(key){
      req(key);
      img.push(req(key));
    });
    this.setState({ images: img });
  }
  toggleShowItem = (part) => {
    this.setState({showItem: !this.state.showItem });
    this.setState({part: part });
  }
  hover = () => { const { sprite } = this.props.sprite;
    document.getElementById('sprite').style.backgroundImage = `url(${(sprite.gender === "Female") ? powerUpF : powerUpM}), url(${aura})`; };
  leave = () => { const { sprite } = this.props.sprite;
    document.getElementById('sprite').style.backgroundImage = `url(${(sprite.gender === "Female") ? idleF : idleM})`; };
  render() {
    const { sprite } = this.props.sprite;
    const { profile } = this.props.profile;
    return (
      <div className={`App-intro${this.props.appState.theme} pad-top-1`}>
        <h1 className="flex-1">{profile.handle}</h1>
        <div id="sprite" className="flex-4" onMouseEnter={this.hover} onMouseLeave={this.leave}
          style={{ backgroundImage: `url(${(sprite.gender === "Female") ? idleF : idleM})` }}></div>
        <div className="flex-5 pad-top-2 row">
          <ul className="inventory">
            <li id="hand" onClick={()=>this.toggleShowItem('hand')}>
              <p>Hand</p>
              <div className="itemImage" style={{ backgroundImage: `url(${aura})` }}></div>
            </li>
            <li id="head" onClick={()=>this.toggleShowItem('head')}>
              <p>Head</p>
              <div className="itemImage" style={{ backgroundImage: `url(${aura})` }}></div>
            </li>
            <li id="body" onClick={()=>this.toggleShowItem('body')}>
              <p>Body</p>
              <div className="itemImage" style={{ backgroundImage: `url(${aura})` }}></div>
            </li>
            <li id="acc1" onClick={()=>this.toggleShowItem('acc1')}>
              <p>Accessory</p>
              <div className="itemImage" style={{ backgroundImage: `url(${aura})` }}></div>
            </li>
            {/* <li id="acc2" onClick={this.toggleShowItem}>
              <p>Accessory 2</p>
              <div className="itemImage" style={{ backgroundImage: `url(${aura})` }}></div>
            </li> */}
          </ul>
          <ul className="fnt-white">
            <li>Level: {sprite.level}</li>
            <li>Experience: {sprite.experience}/{sprite.experienceLimit}</li>
            <li>Gold: {sprite.gold}</li>
            <li>Goals Completed: {sprite.goalsCompleted}</li>
            <li>Achievements Obtained: {sprite.achievements.length}</li>
          </ul>
        </div>
        <ViewItem show={this.state.showItem} toggleView={this.toggleShowItem} sprite={sprite}
          images={this.state.images} part={this.state.part}/>
      </div>
    );
  }
}

Sprite.propTypes = {
  getSpriteByUser: propTypes.func.isRequired,
  sprite: propTypes.object.isRequired,
  profile: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  sprite: state.sprite,
  profile: state.profile,
});

export default connect(mapStateToProps, { getSpriteByUser })(withRouter(Sprite));