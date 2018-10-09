import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import SignUp from '../components/sign-up-page/SignUp';
import SignIn from '../components/sign-in-page/SignIn';
import HomePage from '../components/home-page/HomePage'
import firstPage from '../components/first-page/FirstPage';

class Router0 extends React.Component{

render(){
    return(
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
    )
    }
}
export default Router0