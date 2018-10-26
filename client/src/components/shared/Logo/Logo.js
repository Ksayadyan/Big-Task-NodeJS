import React from 'react';
import {NavLink} from 'react-router-dom';
import './logo.css';

// component logo renders the logo of the website

const Logo = ()=>{
    return(
        <div className = 'logo'>
            <NavLink to = '/'><img src = 'logo.png' alt = 'logo'/></NavLink>
        </div>
    )
}
export default Logo;