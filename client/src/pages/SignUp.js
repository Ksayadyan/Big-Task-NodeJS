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
            telephone : '',
            question : '',
            answer : '',
          
            agree : false
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

    

    handleSubmit(event) {
        const sendObj = this.state;
        event.preventDefault();
        // send.lastName
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


    render(){
        return(
            <div className = 'form-container'>
                <form onSubmit = {this.handleSubmit} className = 'form'>
                    <div className = 'form-field'>
                        <TextField  
                            variant = 'outlined'
                            label = 'Last Name'
                            type = 'text'
                            placeholder = 'Enter your Last Name...'
                            value = {this.state.lastName}
                            onChange = {this.handleChange}
                            name = 'lastName'  />
                    </div>
                    <div className = 'form-field'>
                
                        <TextField
                            variant= 'outlined'
                            label = 'First Name'
                            type = 'text'
                            placeholder = 'Enter your First Name...'
                            value = {this.state.firstName}
                            onChange = {this.handleChange}
                            name = 'firstName' />
                    </div>

                    <div className = 'form-field'>
                        <TextField
                            variant= 'outlined'
                            label = 'Login' 
                            type = 'text'
                            placeholder = 'Enter your Login...'
                            value = {this.state.login}
                            onChange = {this.handleChange}
                            name = 'login'/>
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
                            name = 'password'/>
                    </div>
                    <div className = 'form-field-radio'>
                        <Checkbox  type="radio" className = 'form-field-rad' name="gender" value= 'male' onChange = {this.handleChange} checked={this.state.gender === 'male'}  /> Male
                        <Checkbox type="radio" className = 'form-field-rad' name="gender" value= 'female' onChange = {this.handleChange} checked={this.state.gender === 'female'}  /> Female
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
                            name = 'email'/>    
                     
                    </div>
                    <div className = 'form-field'>
                        <TextField 
                            variant='outlined'
                            label = 'Telephone'
                            type = 'tel'
                            placeholder = 'Enter your telephone...'
                            value = {this.state.telephonel}
                            onChange = {this.handleChange}
                            name = 'telephone'/>
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