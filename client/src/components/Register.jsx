import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Register extends Component {
  constructor(props){
      super(props);
      this.state = {
          name:'',
          email: '',
          password:'',
          password2:'',
          errors: {}
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
        this.setState({ errors: nextProps.errors }, ()=> { console.log(`state: ${this.state.errors}, value: ${nextProps.errors}`); });
    }
    // for(let i = 0; i < document.getElementById('LogonForm').children.length; i++){
    //     let child = document.getElementById('LogonForm').children[i];
    //     if(child.className.includes('err')){
    //       console.log(child);
    //       child.style.display = 'none';
    //     }
    // }
  }
  onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = (e) => {
      e.preventDefault();

      const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
      };
      this.props.registerUser(newUser, this.props.history);
  }
  render() {
      const { errors } = this.state;

      return (
          <div className="Register row">
              <div id="registerImg"></div>
              <form id="RegisterForm" noValidate onSubmit={this.onSubmit}>
                  <input type="text" 
                  name="email"
                  placeholder="EMAIL"
                  value={this.state.email} onChange={this.onChange}
                  className={classnames('', {'is-invalid': errors.email})}
                  />
                  {errors.email && (<div className="err invalid-feedback">{errors.email}</div>)}
                  <input type="text" 
                  name="name" 
                  placeholder="NAME"
                  value={this.state.name} onChange={this.onChange}
                  className={classnames('', {'is-invalid': errors.name})}
                  />
                  {errors.name && (<div className="err invalid-feedback">{errors.name}</div>)}
                  <input type="text" 
                  name="password"
                  placeholder="PASSWORD"
                  value={this.state.password} onChange={this.onChange}
                  className={classnames('', {'is-invalid': errors.password})}
                  />
                  {errors.password && (<div className="err invalid-feedback">{errors.password}</div>)}
                  <input type="text" 
                  name="password2"
                  placeholder="CONFIRM PASSWORD"
                  value={this.state.password2} onChange={this.onChange}
                  className={classnames('', {'is-invalid': errors.password2})}
                  />
                  {errors.password2 && (<div className="err invalid-feedback">{errors.password2}</div>)}
                  <input type="submit"></input>
              </form>
              <span><h1>REGISTER</h1></span>
          </div>
      );
  }
}

Register.propTypes = {
  registerUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors  
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));