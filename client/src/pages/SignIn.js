import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { HashRouter as Router, Route } from 'react-router-dom';

import './signIn.css';
import HomePage from './HomePage';




class SignIn extends React.Component {
    constructor(){
        super();
        this.state = {
            login : '',
            password : '',
            user : null,
            errors :'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    checkUser (get){
        if (!get.Access){
                this.setState({
                    user : get
                })   
                console.log(get)         
        }
        else{
            console.log('error')
        }
    }




    validate = ()=>{
        let errors = {};
          
            if(this.state.login.length === 0){
                errors.loginError = 'login must be at least 1 charecter long'
                }
            if(!this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
                errors.passwordError = 'Password must be at least 6 characters long and contain at least one numeric digit, one uppercase and one lowercase letter';
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
        event.preventDefault();
        const err = this.validate();

            if(!err){
        {
            event.preventDefault();
    
            // console.log('The form was submitted with the following data:');
            // console.log(this.state);
            fetch ('/signin', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(this.state)
            })
            .then (res => res.json())
            .then(get => this.checkUser(get))
            .catch(err => console.log("err", err));
        }

        // console.log('The form was submitted with the following data:');
        // console.log(this.state);
        fetch ('/signin', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(this.state)
        })
        .then (res => res.json())
        .then(get => this.checkUser(get))
        .catch(err => console.log("err", err));
    }
}

    render(){
        if (this.state.user){
            return(
              
                <HomePage user = {this.state.user}/>
            )
        }
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
                <form onSubmit = {this.handleSubmit}  className = 'form'>
                <div className = 'form-field'>

                    <TextField
                            autoFocus
                        variant="outlined"
                        type ='text'
                        label = 'login'
                        placeholder = 'Enter your Login...'
                        value = {this.state.login}
                        onChange = {this.handleChange}
                        name = 'login' />
                        <small className = 'error'>{this.state.loginError}</small>

                </div>
                <div className = 'form-field'>

                    <TextField
                        type = 'password'
                        label="Password"
                        placeholder = 'Enter your Password...'
                        variant="outlined"
                        value = {this.state.password}
                        onChange = {this.handleChange}
                        name = 'password'/>
                        <small className = 'error'>{this.state.passwordError}</small>

</div>
<div className = 'form-field'>
      
           <Button
               variant="outlined"
               color="secondary"
               onClick = {this.handleSubmit} >
                {/* <Link exact to = '/Home_page'>  Sign In</Link> */}             
               Log In 
               
           </Button>
     
</div>

</form>
        </div>

        )
    }

}

export default SignIn


