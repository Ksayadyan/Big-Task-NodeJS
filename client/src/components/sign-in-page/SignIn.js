import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HomePage from '../home-page/HomePage';

let errors = {}
class SignIn extends React.Component {
    constructor(){
        super();
        this.state = {
            login : '',
            password : '',
            user : null,
            errors : {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.loginValidation = this.loginValidation.bind(this);
        this.changeState = this.changeState.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
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
                localStorage.setItem('user',JSON.stringify(get));
                console.log(localStorage.length);
                this.props.history.push('/Home_page');
                console.log(get)
        }
        else{
            console.log('error')
        }
    }
    changeState = ()=>{
        if (Object.keys(errors).length){
            this.setState({
               ...this.state.errors,
               ...errors
            });
        }

        return
    }
    loginValidation = ()=>{
        if(this.state.login.length < 5){
            errors.loginError = 'login must be at least 5 charecter long';
            } else{
                errors.loginError = '';
            }
            this.changeState();
    }


    passwordValidation = ()=>{
            if(!this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
                errors.passwordError = 'Password must be at least 6 characters long and contain at least one numeric digit, one uppercase and one lowercase letter';
                } else{
                    errors.passwordError = '';
                }
                this.changeState();
    }

    handleSubmit(event) {
        event.preventDefault();

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
                <form onSubmit = {this.handleSubmit}  className = 'form'>
                <div className = 'form-field'>

                    <TextField
                        onKeyDown = {this.loginValidation}
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
                        onKeyDown = {this.passwordValidation}
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
