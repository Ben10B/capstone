import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from './common/TextFieldGroup';

class Logon extends Component {
  constructor(props){
      super(props);
      this.state = {
          email:'',
          password:'',
          errors: {}
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/home');
    }
    if(nextProps.errors){
      this.setState({ errors: nextProps.errors });
      // this.setState({ errors: nextProps.errors }, ()=> { console.log(`state: ${this.state.errors}, value: ${nextProps.errors}`); });
    }
    // for(let i = 0; i < document.getElementById('RegisterForm').children.length; i++){
    //   let child = document.getElementById('RegisterForm').children[i];
    //   if(child.className.includes('err')){
    //     console.log(child);
    //     child.style.display = 'none';
    //   }
    // }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = (e) => {
      e.preventDefault();
      const userData = {
          email: this.state.email,
          password: this.state.password
      };
      this.props.loginUser(userData);
  }
  render() {
    const { errors } = this.state;
      return (
          <div className="Logon row">
              <h1>LOGIN</h1>
              <div>
                  <form id="LogonForm" noValidate onSubmit={this.onSubmit}>
                    <TextFieldGroup name="email"
                      placeholder="EMAIL"
                      value={this.state.email} onChange={this.onChange}
                      error={errors.email}
                    />
                    {errors.email && (<div className="err invalid-feedback">{errors.email}</div>)}
                    <TextFieldGroup name="password"
                      placeholder="PASSWORD"
                      value={this.state.password} onChange={this.onChange}
                      error={errors.password}
                    />
                    {errors.password && (<div className="err invalid-feedback">{errors.password}</div>)}
                    <input type="submit" value="Login"/>
                  </form>
              </div>
              <div id="logonImg"></div>
          </div>
      );
  }
}

Logon.propTypes = {
  loginUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors  
});

export default connect(mapStateToProps, { loginUser })(withRouter(Logon));