import React from 'react';
import {Link} from 'react-router-dom'

class SignIn extends React.Component {
    constructor(){
        super();
        this.state = {
            login : '',
            password : '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render(){
        return(
            <div className = 'form-container'>
            <form onSubmit = {this.handleSubmit}  className = 'form'>
              <div className = 'form-field'>
                  <label className = 'form-field-label'>Enter your Login:</label>
                  <br/>
                  <input type ='text' placeholder = 'Enter your Login...' className = 'form-field-input' value = {this.state.login} onChange = {this.handleChange} name = 'login' />
              </div>

              
              <div className = 'form-field'>
                  <label className = 'form-field-label'>Enter your Password:</label>
                  <br/>
                  <input type = 'password' placeholder = 'Enter your Password...' className = 'form-field-input' value = {this.state.password} onChange = {this.handleChange} name = 'password'/>
              </div>
              <div className = 'form-field'>
                  <button className = 'form-field-button' ><Link to = '/Home_page'>Sign In</Link></button>
              </div>
             
            </form>

        </div>
        )
    }

}

export default SignIn