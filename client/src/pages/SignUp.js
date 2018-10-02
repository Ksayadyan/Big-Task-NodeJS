
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';

class SignUp extends React.Component {
    constructor(){
        super();
        this.state = {
            lastName : '',
            login : '',
            firstName : '',
            password : '',
            gender : '',
            birthday : '',
            email : '',
            phone : '',
            question : '',
            answer : '',
            agree : false,
            errors : {
                lastNameError : '',
                firstNameError : '',
                loginError : '',
                passwordError : '',
                emailError : '',
                phoneError : '',           }
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        this.setState({
          [name]: value
        });
     
    }
  

    validate = ()=>{
        let errors = {};
        let phoneNumber = Number(this.state.phone);

            if(this.state.lastName.length === 0 || /[0-9]/.test(this.state.lastName)){
            errors.lastNameError = 'Last Name must be at least one character long and does not contain numbers';
                }
            if(this.state.firstName.length === 0 || /[0-9]/.test(this.state.firstName)){
                errors.firstNameError = 'First Name must be at least one character long and does not contain numbers';
                }
            if(this.state.login.length === 0){
                errors.loginError = 'login must be at least 1 charecter long'
                }
            if(!this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
                errors.passwordError = 'Password must be at least 6 characters long and contain at least one numeric digit, one uppercase and one lowercase letter';
                }
            if(!this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                    errors.emailError = 'Please enter correct email address';
                }
            if(isNaN(phoneNumber)){
                    errors.phoneError = 'Phone must contain only digits';
                }

        if (Object.keys(errors).length){
            this.setState({
               ...this.state.errors, 
               ...errors
            });
        } 
     
        return Object.keys(errors).length
    }

    handleSubmit(event) {
       
        // const sendObj = this.state;
        event.preventDefault();
        // send.lastName
        const err = this.validate();
            if(!err){
                let sendObj = this.state
                console.log('The form was submitted with the following data:');
                console.log(this.state);
        
                    fetch('/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(sendObj)
                })
                .then(res => res.json())
                .then(get => console.log(get))
                .catch(err => console.log("err", err));
    
     }
        
    }


    render(){
        return(
            <div className = 'form-container'>
            
                 <div className = 'logo'>
                    <NavLink to = '/'><img src = 'logo.png' alt = 'logo'/></NavLink>
                </div>
                
                <div className = 'login-form'>
                    <div className = 'change-buttons'>
                        <NavLink exact to ='/sign-in' >
                            <Button  variant="outlined" color="secondary">
                                Sign In
                            </Button>
                        </NavLink>
                        <NavLink exact to ='/sign-up'>
                        <Button variant="outlined" color="secondary">
                            Sign Up
                        </Button>
                        </NavLink>


                    </div>
                </div>
                <form onSubmit = {this.handleSubmit} className = 'form'>
             
                    <div className = 'form-field'>
                
                        <TextField
                            variant= 'outlined'
                            label = 'First Name'
                            type = 'text'
                            placeholder = 'Enter your First Name...'
                            value = {this.state.firstName}
                            onChange = {this.handleChange}
                            name = 'firstName'
                            required />
                            <small className = 'error'>{this.state.firstNameError}</small>

                    </div>
                    <div className = 'form-field'>
                        <TextField  
                            variant = 'outlined'
                            label = 'Last Name'
                            type = 'text'
                            // placeholder = 'Enter your Last Name...'
                            value = {this.state.lastName}
                            onChange = {this.handleChange}
                            TextField = {this.state.lastNameError}
                            name = 'lastName' 
                            required />
                            <small className = 'error'>{this.state.lastNameError}</small>
                    </div>

                    <div className = 'form-field'>
                        <TextField
                            variant= 'outlined'
                            label = 'Login' 
                            type = 'text'
                            placeholder = 'Enter your Login...'
                            value = {this.state.login}
                            onChange = {this.handleChange}
                            name = 'login'
                            required/>
                        <small className = 'error'>{this.state.loginError}</small>

                    </div>
          
                    <div className = 'form-field'>
                        <TextField 
                            variant= 'outlined'
                            label = 'Password'
                            type = 'password'
                            placeholder = 'Enter your password...'
                            className = 'form-field-input'
                            value = {this.state.password}
                            onChange = {this.handleChange}
                            name = 'password'
                            required/>
                            <small className = 'error'>{this.state.passwordError}</small>

                    </div>
                    <div className = 'form-field-radio'>
                        <Checkbox  
                        type="radio"
                        className = 'form-field-rad' 
                        name="gender" value= 'male' 
                        onChange = {this.handleChange} 
                        checked={this.state.gender === 'male'}
                          /> Male
                        <Checkbox 
                            type="radio"
                            className = 'form-field-rad' 
                            name="gender" value= 'female' 
                            onChange = {this.handleChange} 
                            checked={this.state.gender === 'female'}/> Female
                    </div>
                    <div className = 'form-field'>
                            <TextField
                                variant='outlined'
                                label="Date of birth"
                                type="date"
                                defaultValue="2017-05-24"
                                value ={this.state.birthday}
                                onChange = {this.handleChange} 
                                name = 'birthday'
                                InputLabelProps={{
                                shrink: true,
                                }}
                                required    
                            />
                    </div>
              
                    <div className = 'form-field'>
                    <TextField
                            variant = 'outlined'
                            label = 'E-Mail' 
                            type = 'email'
                            placeholder = 'Enter your E-Mail...'
                            value = {this.state.email}
                            onChange = {this.handleChange}
                            name = 'email'
                            required/>
                    <small className = 'error'>{this.state.emailError}</small>
    
                     
                    </div>
                    <div className = 'form-field'>
                        <TextField 
                            variant='outlined'
                            label = 'phone'
                            type = 'text'
                            placeholder = 'XXX-XXX-XXX'
                            value = {this.state.phone}
                            onChange = {this.handleChange}
                            name = 'phone'
                            required/>
                            <small className = 'error'>{this.state.phoneError}</small>

                    </div>
                    <div className = 'form-field'>
                        <TextField  
                            variant='outlined'
                            label = 'Secret Question'
                            type = 'text' 
                            placeholder = 'Enter your Question...' 
                            className = 'form-field-input'
                            value ={this.state.question} 
                            onChange = {this.handleChange} 
                            name = 'question' />
                    </div>
                    <div className = 'form-field'>
                        <TextField
                            variant= 'outlined'
                            label = 'Answer'
                            type = 'text'
                            placeholder = 'Enter your answer...'
                            className = 'form-field-input'
                            value ={this.state.answer}
                            onChange = {this.handleChange}
                            name = 'answer' />
                    </div>
            
                    <div className = 'form-field'>
                        <label className = 'form-checkbox-label'>Do you agree with terms ?</label>
                        <Checkbox type = 'checkbox' className = 'form-field-checkbox' value ={this.state.agree} onChange = {this.handleChange} name = 'agree'/>
                    </div>
                    <div className = 'form-field' >
                            <NavLink to = '/'>
                                <Button 
                                    variant="outlined"
                                    color="secondary" 
                                    onClick = {this.handleSubmit} >
                                    Sign Up
                                </Button>
                                
                            </NavLink>
                    </div>
              
            </form>

        </div>
        )
    }

}

export default SignUp






