import React, { Component } from 'react';
import { connect } from 'react-redux';
import { equipItem } from '../actions/spriteActions';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ViewItem } from './modals/Modals'
import '../css/sprite.css';
import idleM from '../Assets/img/Idle-Male.gif';
import powerUpM from '../Assets/img/PowerUp-Male.gif';
import aura from '../Assets/img/Aura.gif';
import powerUpF from '../Assets/img/PowerUp-Female.gif';
import idleF from '../Assets/img/Idle-Female.gif';
import NA from '../Assets/img/NA.png';

class Sprite extends Component {
  state = {
    showItem: false,
    images: [],
    part: '',
    itemList: [],
  }
  componentDidMount() {
    var req = require.context("../Assets/img", false, /.*\.*$/);
    let img = [];
    req.keys().forEach(function(key){
      req(key);
      img.push({location: key, src: req(key)});
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
    var req = require.context("../Assets/img", false, /.*\.*$/);
    
    let handEquip = (sprite.items.hand.find(item => item.equipped === true) === undefined) ? NA : sprite.items.hand.find(item => item.equipped === true);
    let headEquip = (sprite.items.head.find(item => item.equipped === true) === undefined) ? NA : sprite.items.head.find(item => item.equipped === true);
    let bodyEquip = (sprite.items.body.find(item => item.equipped === true) === undefined) ? NA : sprite.items.body.find(item => item.equipped === true);
    let accEquip = (sprite.items.accessory.find(item => item.equipped === true) === undefined) ? NA : sprite.items.accessory.find(item => item.equipped === true);
    req.keys().forEach(function(key){
      if(key.toString().includes(handEquip.name)) handEquip = req(key);
      if(key.toString().includes(headEquip.name)) headEquip = req(key);
      if(key.toString().includes(bodyEquip.name)) bodyEquip = req(key);
      if(key.toString().includes(accEquip.name)) accEquip = req(key);
    });

    return (
      <div className={`App-intro${this.props.appState.theme} pad-top-1`}>
        <h1 className="flex-1">{profile.handle}</h1>
        <div id="sprite" className="flex-4" onMouseEnter={this.hover} onMouseLeave={this.leave}
          style={{ backgroundImage: `url(${(sprite.gender === "Female") ? idleF : idleM})` }}></div>
        <div className="flex-5 pad-top-2 row">
          <ul className="inventory">
            <li id="hand" onClick={()=>this.toggleShowItem('Hand')}>
              <p>Hand</p>
              <div className="itemImage" style={{ backgroundImage: `url(${handEquip})` }}></div>
            </li>
            <li id="head" onClick={()=>this.toggleShowItem('Head')}>
              <p>Head</p>
              <div className="itemImage" style={{ backgroundImage: `url(${headEquip})` }}></div>
            </li>
            <li id="body" onClick={()=>this.toggleShowItem('Body')}>
              <p>Body</p>
              <div className="itemImage" style={{ backgroundImage: `url(${bodyEquip})` }}></div>
            </li>
            <li id="acc1" onClick={()=>this.toggleShowItem('Accessory')}>
              <p>Accessory</p>
              <div className="itemImage" style={{ backgroundImage: `url(${accEquip})` }}></div>
            </li>
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
          images={this.state.images} part={this.state.part} equip={this.props.equipItem}/>
      </div>
    );
  }
}

Sprite.propTypes = {
  equipItem: propTypes.func.isRequired,
  sprite: propTypes.object.isRequired,
  profile: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  sprite: state.sprite,
  profile: state.profile,
});

export default connect(mapStateToProps, { equipItem })(withRouter(Sprite));