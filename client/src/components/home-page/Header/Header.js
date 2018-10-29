import React from 'react';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import './header.css';
import {withRouter} from 'react-router-dom'; 

const Header = (props) => {

    const move = (url) => {
        props.history.push(url);
    }

    const handleLogOut = () => {
        localStorage.clear();
        props.history.push('/sign-in');
      }
    return(
        <div className="header">
            <NavLink to="/Home_page">
                <img src="https://www.dataowl.io/wp-content/uploads/2017/10/logo.png"/>
            </NavLink>
            <nav>
                <ul className="nav-bar">

                    <li>
                        <Button onClick={()=>{move('/Home_page')}}>
                            Home Page
                        </Button>
                    </li>
                    <li>
                        <Button onClick={() => move('/my_account')}>
                                My Account
                        </Button>
                    </li>
                    <li>
                        <Button onClick={() => move('/search_history')}>
                            Search History
                        </Button>
                    </li>
                    <li>
                        <Button onClick={() => move('/contact')}>
                            Contact
                        </Button>
                    </li>
                    <li>
                        <Button onClick={() => move('/about')}>
                            About
                        </Button>
                    </li>
                 
                    <li><Button onClick={handleLogOut}>Sign Out</Button></li>
                </ul>
            </nav>
        </div>
    )
}
export default withRouter(Header);