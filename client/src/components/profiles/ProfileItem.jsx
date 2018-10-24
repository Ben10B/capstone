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
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="flex-2" 
          style={{ backgroundImage: `url(${(profile.gender === 'Female') ? idleF : idleM})`,
            backgroundRepeat: 'no-repeat', backgroundSize: 'auto', backgroundPosition: 'center'
          }}/>
          <div className="flex-6">
            <h3>{profile.handle}</h3>
            <p>
              {profile.bio}{' '}
              {/* {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )} */}
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
          {/* <div className="flex-2">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
