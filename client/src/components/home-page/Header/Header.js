import React from 'react';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import './header.css';
import SearchIcon from '@material-ui/icons/Search';

const Header = (props) => {
    return(
        <div className="header">
            <NavLink to="/Home_page">
                <img src="https://www.dataowl.io/wp-content/uploads/2017/10/logo.png"/>
            </NavLink>
            <nav>
                <ul className="nav-bar">
                <label className="search-label" >
                    <input type="search" className='inp' placeholder="type URL"/>
                        <SearchIcon onClick={props.urlFetch} onChange={props.onChange}/>
                    </label>
                    <li>
                        <Button onClick={props.myAccount}>
                                My Account
                        </Button>
                    </li>
                    <li>
                        <Button onClick={props.history}>
                            Search History
                        </Button>
                    </li>
                    <li>
                        <Button onClick={props.contact}>
                            Contact
                        </Button>
                    </li>
                    <li>
                        <Button onClick={props.about}>
                            About
                        </Button>
                    </li>
                 
                    <li><Button onClick={props.logOut}>Sign Out</Button></li>
                </ul>
            </nav>
        </div>
    )
}
export default Header;