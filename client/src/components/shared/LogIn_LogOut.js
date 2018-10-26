import React from 'react';
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';

//component LogIn_LogOut renders Log-in Log-out buttons on the First-Page


const LogIn_LogOut=()=>{
    return(
        <div className = 'login-form'>
            <div className = 'change-buttons'>
                <NavLink exact to ='/sign-in' >
                    <Button  variant="outlined" color="secondary" className="button">
                        Sign In
                    </Button>
                </NavLink>
                <NavLink exact to ='/sign-up'>
                    <Button variant="outlined" color="secondary" className="button">
                        Sign Up
                    </Button>
                </NavLink>
            </div>
        </div>
    )
} 

export default LogIn_LogOut; 