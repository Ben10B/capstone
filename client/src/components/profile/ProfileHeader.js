import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import image from '../../Assets/img/Idle-Login.png';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSpriteByUser } from '../../actions/spriteActions';

class ProfileHeader extends Component {
  componentDidMount(){
    const { profileHandle } = this.props;
    this.props.getSpriteByUser(profileHandle.user._id);
  }
  render() {
    const { profileHandle } = this.props;
    const { sprite } = this.props.sprite;

    return (
      <div className="">
        <div className="card column">
          <div className="profile-image" 
            style={{ backgroundImage: `url(${image})`}} />
          <div className="txt-center">
            <h1 className="txt-center">{profileHandle.user.name}</h1>
            <p className="txt-center margn-5">{profileHandle.bio}</p>
            {isEmpty(profileHandle.location) ? null : <p>{profileHandle.location}</p>}
            <p>
              {isEmpty(profileHandle.website) ? null : (
                <a
                  className="text-white p-2"
                  href={profileHandle.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}

              {isEmpty(profileHandle.social && profileHandle.social.twitter) ? null : (
                <a
                  className="text-white p-2"
                  href={profileHandle.social.twitter}
                  target="_blank" rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
              )}

              {isEmpty(profileHandle.social && profileHandle.social.facebook) ? null : (
                <a
                  className="text-white p-2"
                  href={profileHandle.social.facebook}
                  target="_blank" rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}

              {isEmpty(profileHandle.social && profileHandle.social.linkedin) ? null : (
                <a
                  className="text-white p-2"
                  href={profileHandle.social.linkedin}
                  target="_blank" rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}

              {isEmpty(profileHandle.social && profileHandle.social.youtube) ? null : (
                <a
                  className="text-white p-2"
                  href={profileHandle.social.youtube}
                  target="_blank" rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}

              {isEmpty(profileHandle.social && profileHandle.social.instagram) ? null : (
                <a
                  className="text-white p-2"
                  href={profileHandle.social.instagram}
                  target="_blank" rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram fa-2x" />
                </a>
              )}
            </p>
          </div>
          
          {(this.props.request === '' && this.props.request2 === '') ?
            <button className="likeBTN" onClick={this.props.requestClick}>Send Friend Request</button>:""
          }
          {(this.props.request === 'pending' || this.props.request2 === 'pending') ? <button className="btn1">Pending Request</button>:""}
          {this.props.request === 'linked' ? <button className="btn1">Friends</button>:""}
          
        </div>
        <div className="card row">
          <span className="column">
            <h6>Stats</h6>
            <p>Level: {sprite.level}</p>
            <p>Exp: {sprite.experience}/{sprite.experienceLimit}</p>
            <p>Goals Created: {sprite.goalsCreated}</p>
            <p>Goals Completed: {sprite.goalsCompleted}</p>
          </span>
          <span className="column">
            <h6>Achievements</h6>
            {sprite.achievements === undefined ? '' :
              sprite.achievements.map(reward => (
                <p key={reward.name}>{reward.name}</p>
              ))
            }
          </span>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  getSpriteByUser: PropTypes.func.isRequired,
  sprite: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sprite: state.sprite
});

export default connect(mapStateToProps, { getSpriteByUser })(ProfileHeader);

