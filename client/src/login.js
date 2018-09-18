import React from 'react';
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
          <div className = 'nkar'>
            <img src = 'logo.png' alt = 'logo'/>
          </div>
      <ParticlesStyle/>
    <Router>
      <div className = 'container'>
      



         <div className = 'login-form'>
            <div className = 'change-buttons'>
                <NavLink exact activeStyle = {{backgroundColor : '#B52F5C'}} to = '/sign-in' className="sign"> Sign In</NavLink>
                <NavLink exact activeStyle = {{backgroundColor : '#B52F5C'}} to= '/sign-up' className="sign"> Sign Up</NavLink>

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