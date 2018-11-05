import React, { Component } from 'react';
import '../../css/App.css';
import '../../BENstrap-in/css/my.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';
import { createSprite } from '../../actions/spriteActions';
import Header from '../Header.jsx';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      location: '',
      status: '',
      skills: '',
      bio: '',
      gender: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle.trim(),
      location: this.state.location.trim(),
      status: this.state.status,
      gender: this.state.gender,
      bio: this.state.bio.trim(),
      twitter: this.state.twitter.trim(),
      facebook: this.state.facebook.trim(),
      linkedin: this.state.linkedin.trim(),
      youtube: this.state.youtube.trim(),
      instagram: this.state.instagram.trim()
    };
    this.props.createProfile(profileData, this.props.history);
    const newReward = [ {} ];
    newReward[0].name = 'New Grinder';
    newReward[0].acquired = true;

    const spriteData = { 
      gender: this.state.gender,
      achievements: newReward
    };
    this.props.createSprite(spriteData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

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

    // Select options for status
    const options = [
      { label: '* Select gender', value: 0 },
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' }
    ];

    return (
      <div className="App">
        <Header appState={{theme: ''}}/>
        <div className={`App-intro flex-8 create-profile`}>
          <h1 className="display-4 text-center">Create Your Profile</h1>
          <p className="lead text-center">
            Let's setup your profile
                </p>
          <small className="d-block pb-3">* = required fields</small>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Profile Handle"
              name="handle"
              value={this.state.handle}
              onChange={this.onChange}
              error={errors.handle}
              info="A unique handle for your profile URL. Your full name, company name, nickname"
            />
            {errors.handle && (<div className="err invalid-feedback">{errors.handle}</div>)}
            {/* <TextFieldGroup
              placeholder="Skills"
              name="skills"
              value={this.state.skills}
              onChange={this.onChange}
              error={errors.skills}
              info="Please use comma separated values (eg.
                HTML,CSS,JavaScript,PHP"
            /> */}
            <SelectListGroup
              placeholder="gender"
              name="gender"
              value={this.state.gender}
              onChange={this.onChange}
              options={options}
              error={errors.gender}
              info="This will be your sprite's gender"
            />
            <TextFieldGroup
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              error={errors.location}
              info="City or city & state suggested (eg. Boston, MA)"
            />
            <TextAreaFieldGroup
              placeholder="Short Bio"
              name="bio"
              value={this.state.bio}
              onChange={this.onChange}
              error={errors.bio}
              info="Tell us a little about yourself"
            />

            <div className="margn-bottom-3">
              <button
                type="button"
                onClick={() => {
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }));
                }}
                className="likeBTN"
              >
                Add Social Network Links
                    </button>
              <span className="text-muted">Optional</span>
            </div>
            {socialInputs}
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  sprite: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  sprite: state.sprite,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, createSprite })(withRouter(CreateProfile));