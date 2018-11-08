import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import idleF from '../../Assets/img/Idle-Female.gif';
import idleM from '../../Assets/img/Idle-Male.gif';

class ProfileItem extends Component {
  render() {
    const { profile, profileitem } = this.props;
    let item;
    if(profile !== null){
      if(profileitem._id !== profile._id){
        item = (
          <div className="row">
            <div className="flex-2" 
            style={{ backgroundImage: `url(${(profileitem.gender === 'Female') ? idleF : idleM})`,
              backgroundRepeat: 'no-repeat', backgroundSize: 'auto', backgroundPosition: 'center'
            }}/>
            <div className="flex-6">
              <h3>{profileitem.handle}</h3>
              <p>
                {profileitem.bio}
              </p>
              <p>
                {isEmpty(profileitem.location) ? null : (
                  <span>From: {profileitem.location}</span>
                )}
              </p>
              <Link to={`/profile/${profileitem.handle}`} className="btn1">
                View Profile
              </Link>
            </div>
          </div>
        );
      }
    }
    
    return (
      <div className="card">
        {item}
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profileitem: PropTypes.object.isRequired,
  // profile: PropTypes.object.isRequired
};

export default ProfileItem;
