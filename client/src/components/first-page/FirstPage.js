//react main imports
import React from 'react';
// component logo renders the logo of the website
//component LogIn_LogOut renders Log-in Log-out buttons on the First-Page
import Logo from '../shared/Logo/Logo';
import LogIn_LogOut from '../shared/LogIn_LogOut';
import ParticlesStyle from '../particles/particles'


// FirstPage component renders Logo and Log-in Log-out buttons
class FirstPage extends React.Component{

// if the user is Loged in , the browser automatically will go to the home page 
  componentWillMount(){
    if(localStorage.length){
      this.props.history.push('/Home_page');
    }
  }
    render(){
        return (
            <div>
                <ParticlesStyle/>
                <Logo/>
                <LogIn_LogOut/>
            </div>
        )
    }
}

export default FirstPage
