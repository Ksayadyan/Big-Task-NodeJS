//react main imports
import React from 'react';
// errMsg is an object that contains all type of error messages
// Btn is a component that returns material-ui Buttin with given props
import Input from '../../shared/Input';
import errMsg from '../../shared/ErrorMessages.js';
import Btn from '../../shared/Button';
import ErrorField from '../../shared/ErrorField';
// Services
import WebService from '../../../services/WebService';
// errors are pushing to these object after validation
let errors = {}
// SignIn is a class component that returns inputs for signing in with 
// their validation
class Sign_In_Form extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login : '',
            password : '',
            user : null,
            errors : {},
            invalidUser : '',
            buttinDisabled : true,
        }
        // binding all functions which contains this
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.changeState = this.changeState.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
        this.makeButtonActive = this.makeButtonActive.bind(this);
    }
    //makeButtonActive function checks if Login and Password fields are entered
    //with correct validation , it makes LOG-IN button active
    makeButtonActive(){
        if (this.state.loginError === '' && this.state.passwordError === ''){
            this.setState({
                buttinDisabled : false
            })
        }else{
            this.setState({
                buttinDisabled : true
            })
        }
    }
    /* handleChange is a function that takes value from the input 
     and with the setState method gives it to the components state*/
    handleChange(e) {
        let target = e.target;
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
    checkUser (user){
        if (user.name){
                this.setState({
                    user : user
                })
                localStorage.setItem('user',JSON.stringify(user));
                console.log(this.props)
                this.props.history.push('/Home_page');
        }
    }
    /*changeState function checks if there is any validation error
    it sets that error to this.state.errors object*/
    changeState = () => {
        if (Object.keys(errors).length){
            this.setState({
               ...this.state.errors,
               ...errors
            });
        }
    }
    /* checks the condition of the login and sets 
    appropriate value for loginError  */
    loginValidation = () => {
        (this.state.login.length < 5) ?
         errors.loginError = errMsg.loginError:
         errors.loginError = '';
        this.changeState();
    }
    /* checks the password condition and
     sets appropriate value for passwordError  */
    passwordValidation = () => {
        (!this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) ?
        errors.passwordError = errMsg.passwordError:
        errors.passwordError = '';
        this.changeState();
    }
/*sends post request to the server and then 
runs checkUser function with the responce  */
handleSubmit(event) {
    event.preventDefault();
    let body = {
        login : this.state.login,
        password : this.state.password,
    }
    WebService.request('/signin', 'POST', body)
        .then(user => {
            this.checkUser(user);
        })
        .catch(error => {
                console.log(error.statusText);
                this.setState({
                    invalidUser : `User ${error.statusText} , please enter valid login & password`
                })
        })
}
    render(){
        return(
            <div className="form-container">
                <form onSubmit={this.handleSubmit} className="form">
                    <Input 
                        type="text"
                        label="login"
                        variant="outlined"
                        name="login"
                        onKeyDown={this.loginValidation}
                        onChange={this.handleChange}
                        value={this.state.login}
                        onBlur={this.makeButtonActive}
                        /> 
                    <ErrorField errorName={this.state.loginError}/>
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
                     <Btn event={this.handleSubmit} name="Log-In" disabled={this.state.buttinDisabled}/>
                     <ErrorField errorName={this.state.invalidUser}/>
                </form>
            </div>
        )
    }
}
export default Sign_In_Form;
