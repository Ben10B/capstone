import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpriteByUser } from '../actions/spriteActions';
import { getRewards } from '../actions/rewardActions';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import '../css/achievements.css';

const Reward = ({achievement, sprite}) => {
  let styleAcquired = 'reward locked';
  sprite.achievements.forEach(reward => {
    if(reward.name === achievement.name && reward.acquired === true)
      styleAcquired = 'reward unlocked';
  });
  return (
    <div className={styleAcquired}>
      <div style={{backgroundImage: `url(${achievement.location})`}}></div>
      <p>{achievement.name}</p>
    </div>
  );
}

class Achievements extends Component {
  componentWillMount(){
    this.props.getRewards();
  }
  render() {
    const { achievements } = this.props.reward;
    const { sprite } = this.props.sprite;
    var rewards = [];
    for (let i = 0; i < achievements.length; i++) {
      rewards.push(<Reward key={i} achievement={achievements[i]} sprite={sprite}/>);
    }
    return (
      <div className={`App-intro${this.props.appState.theme} pad-top-1`}>
        <h1>Achievements</h1>
        <h4>More Incoming..</h4>
        <span id="reward-container" className="">
          {rewards}
        </span>
      </div>
    );
  }
}

Achievements.propTypes = {
  getSpriteByUser: propTypes.func.isRequired,
  getRewards: propTypes.func.isRequired,
  sprite: propTypes.object.isRequired,
  profile: propTypes.object.isRequired,
  reward: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  sprite: state.sprite,
  profile: state.profile,
  reward: state.reward,
});

export default connect(mapStateToProps, { getSpriteByUser, getRewards })(withRouter(Achievements));