import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

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
    }
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
                  <form noValidate onSubmit={this.onSubmit}>
                    <input type="text" 
                      name="email"
                      placeholder="EMAIL"
                      value={this.state.email} onChange={this.onChange}
                      className={classnames('', {'is-invalid': errors.email})}
                    />
                    {errors.email && (<div className="err invalid-feedback">{errors.email}</div>)}
                    <input type="text" 
                      name="password"
                      placeholder="PASSWORD"
                      value={this.state.password} onChange={this.onChange}
                      className={classnames('', {'is-invalid': errors.password})}
                    />
                    {errors.password && (<div className="err invalid-feedback">{errors.password}</div>)}
                    <input type="submit" value="Login"/>
                  </form>
                  {/* <p><a>Username?</a><i className="fas fa-arrows-alt-h"></i><a>Password?</a></p> */}
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