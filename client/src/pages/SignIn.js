import React from 'react';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



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
                            <Link exact to = '/Home_page'>
                                <Button 
                                    variant="outlined"
                                    color="secondary" 
                                   
                                    >
                                    Sign In
                                </Button>
                            </Link>
                     </div>
             
                </form>

        </div>
        )
    }

}

export default SignIn