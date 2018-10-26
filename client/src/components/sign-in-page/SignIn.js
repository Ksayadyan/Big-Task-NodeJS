//react main imports
import React from 'react';

// My shared components
import LogIn_LogOut from '../shared/LogIn_LogOut';
import Logo from '../shared/Logo/Logo';
import Sign_in_Form from './sign-in-form/Sign_in_Form'
// CSS
import './signIn.css'


/*SignIn component returns all components for rendering Sign-in page */
class SignIn extends React.Component {
    constructor(){
        super();
        this.state={}
    }
    render(){
        return(
            <div className="form-container">
                <Logo/>
                <LogIn_LogOut/>
                <Sign_in_Form history={this.props.history}/>
            </div>
        )
    }
}
export default SignIn;
