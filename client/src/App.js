import React from 'react';
import Router from './routers/Router'
import './App.css'
// import ReactDom from 'react-dom';

class App extends React.Component{
  
  render(){
    return(
        <div>
          <Router/>
        </div>
    )

  }
}
export default App