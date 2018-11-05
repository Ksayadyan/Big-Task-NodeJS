import React from 'react';
// Header component
import Header from '../home-page/Header/Header';
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
  handleSubmit = () => {
    const {image, user} = this.state;
    const formdata = new FormData();
    formdata.append('image',image);

    // WebService.request('/imageUpload','POST', formdata, user.token)
    fetch('/imageUpload',{
      headers:{
        'Authorization': user.token,
      },
      method: 'POST',
      body: formdata,
    })
    .then(()=>{
        alert("Image was succesfully uploaded!!!!!!!");
    }).catch((e)=>{
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
      <div>
          <Header/>
          <div className="content">
              <h2 className="heading">Account</h2>
              <img src={profileImage}/>
              <span>{name} {lastname}</span>
              <div className="image-upload">
                  <label for="file"><img src="upload.png"/></label>
                  <input id="file" type="file" name="image" onChange={this.handleImage}/>
                  <Button className="upload-button" onClick={this.handleSubmit}>Upload Image</Button>
                  <SlideShow token={token}/>
              </div>
          </div>
      </div>
    );
  }
};

export default MyAccount
