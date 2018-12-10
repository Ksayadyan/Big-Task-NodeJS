import React from 'react';
// Header component
import Header from '../home-page/Header/Header';
import UserInformation from './user-information/UserInformation';
//image Slideshow component
import SlideShow from './Image-slideshow/SlideShow';
//Material UI component
import Button from '@material-ui/core/Button';
//CSS
import './myAccount.css';

// MyAccount components renders user's accont page , image upload button and image slide show with uploaded images

class MyAccount extends React.Component{
  constructor(){
    super();
    this.state = {
      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleImage = (event) => {
    event.preventDefault()
    this.setState({
      image : event.target.files[0]
    })
  }
  handleSubmit = () => {
      const {image, user} = this.state;
      const formdata = new FormData();
      formdata.append('image',image);
      fetch('/imageUpload',{
        headers:{
          'Authorization': user.token,
        },
        method: 'POST',
        body: formdata,
      })
      .then((res)=>{
          return res.json();
          
      }).then((data) => {
        console.log(data)
      })
      
      .catch((e)=>{
        console.log(e);
      })
  }
  componentWillMount = ()=>{
    let user = JSON.parse(localStorage.getItem('user'));
    this.setState({user:user});
  }

  render() {
    const {name, lastname, profileImage, token} = this.state.user;
    return (
      <div className="my-account-container">
          <Header/>
          <UserInformation 
              handleImage={this.handleImage}
              profileImage={profileImage}
              name={name}
              lastname={lastname}
              handleSubmit={this.handleSubmit}
              token={token}/>
          <SlideShow token={token}/>

      </div>
    );
  }
};

export default MyAccount
