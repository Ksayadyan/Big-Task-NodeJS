import React from 'react';
import Button from '@material-ui/core/Button';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage'
import './App.css'
import ParticlesStyle from './particles/particles'

// import ReactDom from 'react-dom';

class App extends React.Component{
  
  render(){
    return(
      <div>
         
      <ParticlesStyle/>
      <Router>
      <div className = 'container'>
              <div className = 'logo'>
                <NavLink to = '/'><img src = 'logo.png' alt = 'logo'/></NavLink>
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
     
        <Route exact path = '/sign-in' component = {SignIn}>
             
        </Route>
       
        <Route exact path = '/sign-up' component = {SignUp}> 
          
        </Route>
        <Route exact path = '/Home_page' component = {HomePage}>

        </Route>

    
      </div>
    </Router>
    </div>
    )

  }
}
export default App