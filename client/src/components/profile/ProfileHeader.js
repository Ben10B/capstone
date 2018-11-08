import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import image from '../../Assets/img/Idle-Login.png';

class ProfileHeader extends Component {
  render() {
    const { profileHandle } = this.props;

    return (
      <div className="row">
        <div className="card column">
          <div className="profile-image" 
            style={{ backgroundImage: `url(${image})`}} />
          <div className="txt-center">
            <h1 className="display-4 txt-center">{profileHandle.user.name}</h1>
            {isEmpty(profileHandle.location) ? null : <p>{profileHandle.location}</p>}
            <p>
              {isEmpty(profileHandle.website) ? null : (
                <a
                  className="text-white p-2"
                  href={profileHandle.website}
                  target="_blank"
                >
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}

              {isEmpty(profileHandle.social && profileHandle.social.twitter) ? null : (
                <a
                  className="text-white p-2"
                  href={profileHandle.social.twitter}
                  target="_blank"
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
              )}

              {isEmpty(profileHandle.social && profileHandle.social.facebook) ? null : (
                <a
                  className="text-white p-2"
                  href={profileHandle.social.facebook}
                  target="_blank"
                >
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}

              {isEmpty(profileHandle.social && profileHandle.social.linkedin) ? null : (
                <a
                  className="text-white p-2"
                  href={profileHandle.social.linkedin}
                  target="_blank"
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}

              {isEmpty(profileHandle.social && profileHandle.social.youtube) ? null : (
                <a
                  className="text-white p-2"
                  href={profileHandle.social.youtube}
                  target="_blank"
                >
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}

              {isEmpty(profileHandle.social && profileHandle.social.instagram) ? null : (
                <a
                  className="text-white p-2"
                  href={profileHandle.social.instagram}
                  target="_blank"
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
      </div>
    );
  }
}

export default ProfileHeader;
