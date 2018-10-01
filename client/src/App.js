import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage'
import './App.css'
import ParticlesStyle from './particles/particles'
import firstPage from './pages/firstPage';

// import ReactDom from 'react-dom';

class App extends React.Component{
  
  render(){
    return(
      <div>
         
      <ParticlesStyle/>
      <Router>
      <div className = 'container'>
             
        <Route exact path = '/' component = {firstPage}>

        </Route>
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