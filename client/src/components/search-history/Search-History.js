import React from 'react';
import Button from '@material-ui/core/Button';
import './searchHistory.css';
import Header from '../home-page/Header/Header'

class MyAccount extends React.Component{
  constructor(){
    super();
    this.state = {
      history : null,
    }
    this.drawer = this.drawer.bind(this);
  }
  drawer(obj){
    for (let x in obj ){
        console.log('Group:',x);
        for (let i = 0 ; i < obj[x].length ; i++ ){
          console.log('   URL: ',obj[x][i].url);
        } 
    }
  }


  render() {
    return (
      <div>
          <Header />
      </div>
    );
  }
};



export default MyAccount
    