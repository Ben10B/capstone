import React, { Component } from 'react';
import '../css/account.css';
import def from '../Assets/img/Default-Theme.png';
import theme1 from '../Assets/img/Theme-One.png';
import theme2 from '../Assets/img/Theme-Two.png';
import theme3 from '../Assets/img/Theme-Three.png';
import theme4 from '../Assets/img/Theme-Four.png';
import theme5 from '../Assets/img/Theme-Five.png';
import TextAreaFieldGroup from './common/TextAreaFieldGroup';
import InputGroup from './common/InputGroup';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { editProfile } from '../actions/profileActions';
import isEmpty from '../validation/is-empty';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      location: '',
      status: '',
      skills: '',
      bio: '',
      theme: '',
      gender: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      view: 'edit',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const profile = this.props.profile.profile;

    // Bring skills array back to CSV
    const skillsCSV = profile.skills.join(',');

    // If profile field doesnt exist, make empty string
    profile.company = !isEmpty(profile.company) ? profile.company : '';
    profile.gender = !isEmpty(profile.gender) ? profile.gender : '';
    profile.website = !isEmpty(profile.website) ? profile.website : '';
    profile.location = !isEmpty(profile.location) ? profile.location : '';
    profile.githubusername = !isEmpty(profile.githubusername)
      ? profile.githubusername
      : '';
    profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
    profile.social = !isEmpty(profile.social) ? profile.social : {};
    profile.twitter = !isEmpty(profile.social.twitter)
      ? profile.social.twitter
      : '';
    profile.facebook = !isEmpty(profile.social.facebook)
      ? profile.social.facebook
      : '';
    profile.linkedin = !isEmpty(profile.social.linkedin)
      ? profile.social.linkedin
      : '';
    profile.youtube = !isEmpty(profile.social.youtube)
      ? profile.social.youtube
      : '';
    profile.instagram = !isEmpty(profile.social.instagram)
      ? profile.social.instagram
      : '';

    // Set component fields state
    this.setState({
      handle: profile.handle,
      company: profile.company,
      website: profile.website,
      location: profile.location,
      gender: profile.gender,
      status: profile.status,
      skills: skillsCSV,
      githubusername: profile.githubusername,
      bio: profile.bio,
      twitter: profile.twitter,
      facebook: profile.facebook,
      linkedin: profile.linkedin,
      youtube: profile.youtube,
      instagram: profile.instagram
    });

  }
  changeView = (opt) => {
    this.setState({ view: opt });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onClickTheme(value) {
    this.setState({ theme: value });
  }
  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      location: this.state.location,
      status: this.state.status,
      gender: this.state.gender,
      skills: this.state.skills,
      bio: this.state.bio,
      theme: this.state.theme,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.editProfile(profileData, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { profile } = this.props.profile;
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    let view;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }
    if (this.state.view === 'edit') {
      view = (<div id="edit">
        <h1>{profile.user.name}</h1>
        <form onSubmit={this.onSubmit}>
          <label>BIO</label>
          <TextAreaFieldGroup placeholder="Short Bio"
            name="bio"
            value={this.state.bio}
            onChange={this.onChange}
            error={errors.bio} // info="Tell us a little about yourself"
          />
          <div className="margn-top-3 margn-bottom-3">
            <div type="button"
              onClick={() => {
                this.setState(prevState => ({
                  displaySocialInputs: !prevState.displaySocialInputs
                }));
              }}
              className="btn1"
            >Edit Social Network Links
              </div>
          </div>
          {socialInputs}
          <span className="">
            <h6>Choose a Theme</h6>
            <div className="themeDiv">
              <div name="theme" className="theme" style={{ background: `url(${def}) center/cover` }}
                onClick={() => { this.props.click('') }} onChange={() => this.onClickTheme('-theme')}>Default</div>
              <div name="theme" className="theme" style={{ background: `url(${theme1}) center/cover` }}
                onClick={() => { this.props.click('-theme1'); this.onClickTheme('-theme1') }}>Theme One</div>
              <div name="theme" className="theme" style={{ background: `url(${theme2}) center/cover` }}
                onClick={() => { this.props.click('-theme2'); this.onClickTheme('-theme2') }}>Theme Two</div>
              <div name="theme" className="theme" style={{ background: `url(${theme3}) center/cover` }}
                onClick={() => { this.props.click('-theme3'); this.onClickTheme('-theme3') }}>Theme Three</div>
              <div name="theme" className="theme" style={{ background: `url(${theme4}) center/cover` }}
                onClick={() => { this.props.click('-theme4'); this.onClickTheme('-theme4') }}>Theme Four</div>
              <div name="theme" className="theme" style={{ background: `url(${theme5}) center/cover` }}
                onClick={() => { this.props.click('-theme5'); this.onClickTheme('-theme5') }}>Theme Five</div>
            </div>
          </span>
          <input type="submit" value="Save" className="btn1"/>
        </form>
        <button onClick={this.props.onDeleteClick.bind(this)} className="delBTN"><i className="fas fa-user-times"></i>DELETE ACCOUNT</button>
      </div>);
    } else {
      view = (<div id="friends">
        <h1>Friends List</h1>
      </div>);
    }
    return (
      <div className={`App-intro${this.props.appState.theme} pad-top-1`}>
        <ul className="card row">
          <li className={(this.state.view === 'edit') ? 'pageOpt active' : 'pageOpt'} onClick={() => this.changeView('edit')}>
            <i className="fas fa-id-card-alt"></i>
            <a> Edit Profile</a>
          </li>
          <li className={(this.state.view === 'friends') ? 'pageOpt active' : 'pageOpt'} onClick={() => this.changeView('friends')}>
            <i className="fas fa-address-book"></i>
            <a> Friends</a>
          </li>
        </ul>
        {view}
      </div>
    );
  }
}

Account.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  editProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { editProfile })(withRouter(Account));