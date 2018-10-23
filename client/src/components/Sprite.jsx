import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpriteByUser } from '../actions/spriteActions';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import '../css/sprite.css';
import idleM from '../Assets/img/Idle-Male.gif';
import powerUpM from '../Assets/img/PowerUp-Male.gif';
import aura from '../Assets/img/Aura.gif';
import powerUpF from '../Assets/img/PowerUp-Female.gif';
import idleF from '../Assets/img/Idle-Female.gif';

class Sprite extends Component {
    hover = () => { document.getElementById('sprite').style.backgroundImage = `url(${(this.props.sprite.gender === "Female") ? powerUpF : powerUpM}), url(${aura})`; };
    leave = () => { document.getElementById('sprite').style.backgroundImage = `url(${(this.props.sprite.gender === "Female") ? idleF : idleM})`; };
    render() {
        const { sprite } = this.props.sprite;
        return (
            <div className={`App-intro${this.props.appState.theme} pad-top-1`}>
                <h1 className="flex-1">Sprite</h1>
                <div id="sprite" className="flex-4" onMouseEnter={this.hover} onMouseLeave={this.leave}
                style={{ backgroundImage: `url(${(this.props.sprite.gender === "Female") ? idleF : idleM})` }}></div>
                <div className="flex-5 pad-top-2">
                    <h3>Level: {sprite.level}</h3>
                    <h3>Experience: {sprite.experience}/{sprite.experienceLimit}</h3>
                    <h3>Gold: {sprite.gold}</h3>
                    <h3>Goals Completed: {sprite.goalsCompleted}</h3>
                </div>
            </div>
        );
    }
}
  
Sprite.propTypes = {
    getSpriteByUser: propTypes.func.isRequired,
    sprite: propTypes.object.isRequired,
}
  
const mapStateToProps = (state) => ({
    sprite: state.sprite,
});

export default connect(mapStateToProps, { getSpriteByUser })(withRouter(Sprite));