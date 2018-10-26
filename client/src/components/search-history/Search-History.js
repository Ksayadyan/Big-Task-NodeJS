import React from 'react';
import Button from '@material-ui/core/Button';
import './searchHistory.css';

class MyAccount extends React.Component{
  constructor(){
    super();
    this.state = {
      history : null,
    }
    this.handleClick = this.handleClick.bind(this);
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
  componentDidMount (){
      fetch('/browseHistory',{
        method : 'GET',
        
      })
      .then(res => res.json())
      .then((get)=>{
        this.setState({
          history : get[0].history,
        })
        this.drawer(this.state.history)
      })
      .catch((err)=>{
        console.log('error', err)
      })
  }
  handleClick(){
    this.props.history.push('/Home_page');
  }
  render() {
    return (
      <div>

          Welcome to Search History page
        <div className = 'backHomepage' >
            <Button 
                color = 'secondary'
                onClick = {this.handleClick}>
                Back to Home page
            </Button>
        </div>
                  
    </div>
    );
  }
};



export default MyAccount
    