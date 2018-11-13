import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';
import { getProfileByHandle, sendFriendRequest, getCurrentProfile } from '../../actions/profileActions';

class Profile extends Component {
  state = { friendRequest: ''}
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getCurrentProfile();
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && nextProps.profile.profileHandle === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }
  sendFriendRequest = () => {
    const { profile } = this.props.profile;
    this.setState({friendRequest: 'pending'});
    this.props.sendFriendRequest(this.props.match.params.handle, profile._id);
  }
  render() {
    const { profile, profileHandle, loading } = this.props.profile;
    let profileContent;

    if (profile === null || profileHandle === null || loading) {
      profileContent = <Spinner />;
    } else {
      // if(profile !== null && profileHandle !== null){
        let hasRequested = '';
        profile.friends.forEach(friend => {
          if(friend.profile._id === profileHandle._id){
            if(friend.request || friend.request === undefined){
              hasRequested = 'pending';
            } else {hasRequested = 'linked';}
          }
        });
        
        profileContent = (
          <div className="column">
          <Link to="/profiles" className="btn1"> Back To Profiles </Link>
          <ProfileHeader requestClick={this.sendFriendRequest} profileHandle={profileHandle}
            request={hasRequested} request2={this.state.friendRequest}/>          
        </div>
        );
      // }
    }

    return (
      <div className="profile">
        {profileContent}
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle, sendFriendRequest, getCurrentProfile })(Profile);
