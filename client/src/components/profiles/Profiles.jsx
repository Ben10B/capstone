import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles, getCurrentProfile } from '../../actions/profileActions';

class Profiles extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getProfiles();
  }

  render() {
    const {profile, profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profileitem => (<ProfileItem key={profileitem._id} profile={profile} profileitem={profileitem} />));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <h1 className="txt-center">Grinder Profiles</h1>
        <Link to="/home" className="btn1">Back to home</Link>
        <p className="lead txt-center">
          Grind with other hustlas!
          </p>
        {profileItems}
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles, getCurrentProfile })(withRouter(Profiles));
