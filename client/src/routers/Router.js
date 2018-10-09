import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../components/sign-up-page/SignUp';
import SignIn from '../components/sign-in-page/SignIn';
import HomePage from '../components/home-page/HomePage'
import firstPage from '../components/first-page/FirstPage';
import NotFound from '../components/not-found/NotFound';


class Router0 extends React.Component{

render(){
    return(
        <Router>
        <div className = 'container'>
          <Switch>
                    
              <Route exact path = '/' component = {firstPage}/>
      
              <Route exact path = '/sign-in' component = {SignIn}/>
          
              <Route exact path = '/sign-up' component = {SignUp}/> 
            
              <Route exact path = '/Home_page' component = {HomePage}/>

              <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    )
    }
}
export default Router0