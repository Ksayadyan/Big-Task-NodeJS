import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Users from './pages/Users'
import './App.css'
import ParticlesStyle from './particles/particles'

// import ReactDom from 'react-dom';

class App extends React.Component{
  
  render(){
    return(
      <div>
          <div className = 'nkar'>
            <img src = 'logo.png'/>
          </div>
      <ParticlesStyle/>
    <Router>
      <div className = 'container'>
      



         <div className = 'login-form'>
            <div className = 'change-buttons'>
                <Link to = '/' className="sign"> Sign In</Link>
                <Link to= '/sign-up' className="sign"> Sign Up</Link>

            </div>
        </div> 
        <Route exact path = '/' component = {SignIn}>
             
        </Route>
       
        <Route exact path = '/sign-up' component = {SignUp}> 
            

        </Route>

    
      </div>
    </Router>
    </div>
    )

  }
}
export default App