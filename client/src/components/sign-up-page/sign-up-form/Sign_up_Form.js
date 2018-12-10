//react main imports
import React from 'react';
import {withRouter} from 'react-router-dom';     
// My shared components
import errMsg from '../../shared/ErrorMessages.js';
import Input from '../../shared/Input';
import Btn from '../../shared/Button';
import ErrorField from '../../shared/ErrorField'
// Material-Ui components 
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
// Services
import WebService from '../../../services/WebService';
// CSS
import '../signUp.css';
// errors are pushing to these object after validation
let errors = {}
// SignUp is a class component that returns inputs for signing up with 
// their validation
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
            errors : {},
            buttinDisabled : true 
        }
        // binding all functions which contains this
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.firstNameValidation = this.firstNameValidation.bind(this);
        this.lastNameValidation = this.lastNameValidation.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
        this.questionValidation = this.questionValidation.bind(this);
        this.dateValidation = this.dateValidation.bind(this);
        this.loginValidation = this.loginValidation.bind(this);
        this.answerValidation = this.answerValidation.bind(this);
        this.emailValidation = this.emailValidation.bind(this);
        this.makeButtonActive = this.makeButtonActive.bind(this);
    }
/* handleChange is a function that takes value from the input 
     and with the setState method gives it to the components state*/
    handleChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        this.setState({
          [name]: value
        });
    }
      /*CheckUser function checks if login and password ere correct and the
    answer from the server is correct , it sets the get (answer from the server)
    to this.state.user and pushes to the home page  
     */
    changeState = () => {
        if(Object.keys(errors).length){
            this.setState({
               ...this.state.errors, 
               ...errors
            });
        } 
    }


    makeButtonActive(){
        if ( this.state.loginError === '' && this.state.lastNameError === '' && this.state.passwordError === '' & this.state.phoneError === ''){
            this.setState({
                buttinDisabled:false
            })
        }else{
            this.setState({
                buttinDisabled : true
            })
        }
    }
    /* All validation functions are checking for the condition 
    and setting appropriate value for error type*/
    firstNameValidation = () => { 
        (this.state.firstName.length < 3|| /[0-9]/.test(this.state.firstName)) ?
            errors.firstNameError = errMsg.firstNameError:
            errors.firstNameError = '';          
        this.changeState();
    };
    lastNameValidation = () => {
        (this.state.lastName.length < 3 || /[0-9]/.test(this.state.lastName)) ?
            errors.lastNameError = errMsg.lastNameError:
            errors.lastNameError = '';   
        this.changeState();
    }
    loginValidation = () => {
        (this.state.login.length < 5) ?
            errors.loginError = errMsg.loginError:
            errors.loginError = '';
        this.changeState();
    }
    passwordValidation = () => {
        (!this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) ?
            errors.passwordError = errMsg.passwordError:
            errors.passwordError = '';
        this.changeState();
    }
    emailValidation = () => {
        (!this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) ?
            errors.emailError = errMsg.emailError:
            errors.emailError = '';
        this.changeState();
    }
    phoneValidation = () => {
        let phoneNumber = Number(this.state.phone);
        (isNaN(phoneNumber)) ?  
            errors.phoneError = errMsg.phoneError : 
            errors.phoneError = '';
        this.changeState();
    }   
    questionValidation = () => {
        (this.state.question.length === 0) ? 
            errors.questionError = errMsg.questionError:
            errors.questionError = '';
        this.changeState();
    }
    answerValidation = () => {
        (this.state.answer.length === 0) ?
            errors.answerError = errMsg.answerError:
            errors.answerError = '',
            this.changeState();
    }
    dateValidation = () => {
        const date =  Number(this.state.birthday.slice(0,4));
        const currentYear = new Date().getFullYear();
        (currentYear - date < 12) ?
            errors.birthdayError = errMsg.birthdayError:
            errors.birthdayError = '';
        this.changeState();
    }
    handleSubmit(event){
        event.preventDefault();
        const {lastName, login, firstName, password, gender, birthday, email, phone, question, answer} = this.state;
        let body = { lastName, login, firstName, password, gender, birthday, email, phone, question, answer};

        WebService.request('/api', 'POST', body)
                .then(get => {
                    if(get){
                        alert("Succesfully registered!!!");
                       console.log('everything is ok')
                        this.history.push('/sign-in');
                    }
                })
                .catch(err => console.log("err", err));
    }
    render(){
        return(
            <div className="form-container">
                <form onSubmit={this.handleSubmit} className="form">
                <Input 
                    type="text"
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    onKeyDown={this.firstNameValidation}
                    onChange={this.handleChange}
                    value={this.state.firstName}
                    />
                <ErrorField errorName={this.state.firstNameError}/>
                <Input 
                    onBlur={this.makeButtonActive}
                    type="text"
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    onKeyDown={this.lastNameValidation}
                    onChange={this.handleChange}
                    value={this.state.lastName}
                    />
                <ErrorField errorName={this.state.lastNameError}/>                
                <Input 
                    onBlur={this.makeButtonActive}
                    type="text"
                    label="login"
                    variant="outlined"
                    name="login"
                    onKeyDown={this.loginValidation}
                    onChange={this.handleChange}
                    value={this.state.login}
                    /> 
                <Input 
                    onBlur={this.makeButtonActive}
                    type="password"
                    label="password"
                    variant="outlined"
                    name="password"
                    onKeyDown={this.passwordValidation}
                    onChange={this.handleChange}
                    value={this.state.password}
                    /> 
                <ErrorField errorName={this.state.passwordError}/> 
                <div>               
                    <Checkbox  
                        type="radio"
                        className="form-field-rad" 
                        name="gender" 
                        value="male" 
                        onChange = {this.handleChange} 
                        checked={this.state.gender==="male"}/>
                        Male
                    <Checkbox 
                        type="radio"
                        className="form-field-rad" 
                        name="gender"
                        value="female" 
                        onChange = {this.handleChange} 
                        checked={this.state.gender==="female"}/> Female
                </div>
                <TextField
                    onBlur={this.dateValidation}
                    variant="outlined"
                    label="Date of birth"
                    type="date"
                    value={this.state.birthday}
                    onChange={this.handleChange} 
                    name="birthday"
                    InputLabelProps={{
                            shrink: true,
                        }}
                    required />
                <ErrorField errorName={this.state.birthdayError}/>                                    
                <Input 
                    type="email"
                    label="E-Mail"
                    variant="outlined"
                    name="email"
                    onKeyDown={this.emailValidation}
                    onChange={this.handleChange}
                    value={this.state.email}
                    />
                <ErrorField errorName={this.state.emailError}/>                                    
                 <Input
                    onBlur={this.makeButtonActive} 
                    type="text"
                    label="phone"
                    variant="outlined"
                    name="phone"
                    onKeyDown={this.phoneValidation}
                    onChange={this.handleChange}
                    value={this.state.phone}
                    />     
                <ErrorField errorName={this.state.phoneError}/>                                    
                  <Input 
                    type="text"
                    label="Secret Question"
                    variant="outlined"
                    name="question"
                    onKeyDown={this.questionValidation}
                    onChange={this.handleChange}
                    value={this.state.question}
                    />
                <Input 
                    type="text"
                    label="Answer"
                    variant="outlined"
                    name="answer"
                    onKeyDown={this.answerValidation}
                    onChange={this.handleChange}
                    value={this.state.answer}
                    /> 
                <Btn event={this.handleSubmit} name="Sign-Up" disabled = {this.state.buttinDisabled}/>
            </form>
        </div>
        )
    }
}
export default withRouter(SignUp);