import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './signIn.css';




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
        fetch ('/signin', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(this.state)
        })
        .then (res => res.json())
        .then(get => console.log(get))
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
           variant="outlined"
           type ='text'
           label = 'login'
           placeholder = 'Enter your Login...'
           value = {this.state.login}
           onChange = {this.handleChange}
           name = 'login' />
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
</div>
<div className = 'form-field'>
      
           <Button
               variant="outlined"
               color="secondary"
               onClick = {this.handleSubmit} >
                <Link exact to = '/Home_page'>  Sign In</Link>
             
               
           </Button>
     
</div>

</form>

        </div>
        )
    }

}

export default SignIn


