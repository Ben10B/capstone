import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import idleF from '../../Assets/img/Idle-Female.gif';
import idleM from '../../Assets/img/Idle-Male.gif';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card">
        <div className="row">
          <div className="flex-2" 
          style={{ backgroundImage: `url(${(profile.gender === 'Female') ? idleF : idleM})`,
            backgroundRepeat: 'no-repeat', backgroundSize: 'auto', backgroundPosition: 'center'
          }}/>
          <div className="flex-6">
            <h3>{profile.handle}</h3>
            <p>
              {profile.bio}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>From: {profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn1">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
