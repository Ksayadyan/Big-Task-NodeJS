import React from 'react';
import Router from './routers/Router'
import './App.css'
import ParticlesStyle from './components/particles/particles'

// import ReactDom from 'react-dom';

class App extends React.Component{
  
  render(){
    return(
      <div>
         
      <ParticlesStyle/>
      <Router/>

    </div>
    )

  }
}
export default App