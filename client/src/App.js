import React from 'react';
import Router0 from './components/Router'
import { HashRouter as Router, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import HomePage from './components/HomePage'
import './App.css'
import ParticlesStyle from './components/particles/particles'
import firstPage from './components/FirstPage';

// import ReactDom from 'react-dom';

class App extends React.Component{
  
  render(){
    return(
      <div>
         
      <ParticlesStyle/>
      <Router0/>

    </div>
    )

  }
}
export default App