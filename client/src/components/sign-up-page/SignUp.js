//react main imports
import React from 'react';

// My shared components
import LogIn_LogOut from '../shared/LogIn_LogOut.js';
import Logo from '../shared/Logo/Logo';

import Sign_up_Page from './sign-up-form/Sign_up_Form'


const SignUp=()=>{
    return(
        <div className = 'form-container'>
            <Logo/>
            <LogIn_LogOut/>
            <Sign_up_Page/>
        </div>
    )
}
  
export default SignUp;