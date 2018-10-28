import React from 'react';
import Button from '@material-ui/core/Button';
import './myAccount.css';
import Header from '../home-page/Header/Header';
import WebService from '../../services/WebService';



class MyAccount extends React.Component{
  constructor(){
    super();
    this.state = {
      image : null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleImage = (event) => {
    event.preventDefault()
    this.setState({
      image : event.target.files[0]
    })
  }
  handleSubmit = (event) => {

    let body = this.state.image;
    console.log( body)

    
  }
  componentWillMount = ()=>{
    let user = JSON.parse(localStorage.getItem('user'));
    this.setState({user:user});
  }

  render() {
    return (
      <div>
          <Header/>
          <div className="content">
              <h2 className="heading">Account</h2>
              <img src={this.state.user.profileImage}/>
              <span>{this.state.user.name} {this.state.user.lastname}</span>
              <input type="file" name="image" onChange={this.handleImage}/>
              <button onClick={this.handleSubmit}>Upload Image</button>
          </div>
      </div>
    );
  }
};

export default MyAccount
