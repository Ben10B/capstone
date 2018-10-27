import React, { Component } from 'react';
import '../css/App.css';
import '../BENstrap-in/css/my.css';
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
    componentDidMount(){
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
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
        return (
            <div className={`App-intro${this.props.appState.theme} pad-top-1`}>
                <h1 className="flex-2">{profile.user.name}</h1>
                <div className="flex-4">
                    <form onSubmit={this.onSubmit}>
                        {/* <TextFieldGroup
                        placeholder="Profile Handle"
                        name="handle"
                        value={this.state.handle}
                        onChange={this.onChange}
                        error={errors.handle}
                        info="A unique handle for your profile URL. Your full name, company name, nickname"
                        />
                        {errors.handle && (<div className="err invalid-feedback">{errors.handle}</div>)} */}
                        <TextAreaFieldGroup
                            placeholder="Short Bio"
                            name="bio"
                            value={this.state.bio}
                            onChange={this.onChange}
                            error={errors.bio}
                            info="Tell us a little about yourself"
                        />
                        <div className="margn-bottom-3">
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
                        <input type="submit" value="Save" className="btn" />
                    </form>
                </div>
                <span className="flex-3">
                    <h6>Choose a Theme</h6>
                    <div className="row themeDiv">
                        <div className="theme" style={{ background: `url(${def}) center/cover` }}
                        onClick={()=>this.props.click('')}>Default</div>
                        <div className="theme" style={{ background: `url(${theme1}) center/cover` }}
                        onClick={()=>this.props.click('-theme1')}>Theme One</div>
                        <div className="theme" style={{ background: `url(${theme2}) center/cover` }}
                        onClick={()=>this.props.click('-theme2')}>Theme Two</div>
                        <div className="theme" style={{ background: `url(${theme3}) center/cover` }}
                        onClick={()=>this.props.click('-theme3')}>Theme Three</div>
                        <div className="theme" style={{ background: `url(${theme4}) center/cover` }}
                        onClick={()=>this.props.click('-theme4')}>Theme Four</div>
                        <div className="theme" style={{ background: `url(${theme5}) center/cover` }}
                        onClick={()=>this.props.click('-theme5')}>Theme Five</div>
                    </div>
                </span>
                <button onClick={this.props.onDeleteClick.bind(this)} className="delBTN"><i className="fas fa-user-times"></i>DELETE ACCOUNT</button>
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