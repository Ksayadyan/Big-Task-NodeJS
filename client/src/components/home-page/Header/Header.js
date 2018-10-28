import React from 'react';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import './header.css';
import {withRouter} from 'react-router-dom'; 




const Header = (props) => {
    const moveToAbout = () => {
        props.history.push('/about')
      }
    const moveToHomePage = () => {
        props.history.push('/Home_page')
    }
    
    const moveToMyAccount = ()=>{
        props.history.push('/my_account')
      }
    const moveToContact = ()=>{
        props.history.push('/contact')
      }
    const moveToSearchHistory = ()=>{
        props.history.push('/search_history')
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
                        <Button onClick={moveToHomePage}>
                            Home Page
                        </Button>
                    </li>
                    <li>
                        <Button onClick={moveToMyAccount}>
                                My Account
                        </Button>
                    </li>
                    <li>
                        <Button onClick={moveToSearchHistory}>
                            Search History
                        </Button>
                    </li>
                    <li>
                        <Button onClick={moveToContact}>
                            Contact
                        </Button>
                    </li>
                    <li>
                        <Button onClick={moveToAbout}>
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