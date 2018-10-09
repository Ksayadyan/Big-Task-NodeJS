import React from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';


class firstPage extends React.Component{
  componentWillMount(){
    if(localStorage.length){
      this.props.history.push('/Home_page');
    }
  }
    render(){
        return (
            <div className = 'form-container test'>
                <div className = 'logo'>
                    <NavLink to = '/'><img src = '../logo.png' alt = 'logo'/></NavLink>
                </div>



                <div className = 'login-form'>
                    <div className = 'change-buttons'>
                        <NavLink exact to ='/sign-in' >
                            <Button  variant="outlined" color="secondary">
                                Sign In
                            </Button>
                        </NavLink>
                        <NavLink exact to ='/sign-up'>
                            <Button variant="outlined" color="secondary">
                                Sign Up
                            </Button>
                        </NavLink>


                    </div>
                </div>
        </div>
        )
    }
}

export default firstPage
