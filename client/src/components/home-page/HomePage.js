import React from 'react';
import Header from './Header/Header';
import {Redirect} from 'react-router-dom';
import './homePage.css';
import LeftContent from './Left-Content/Left-Content';
import Body from './Body/Body';

class HomePage extends React.Component {
  constructor(){
    super();
  this.state = {
    auth: true,
    anchorEl: null,
    top: false,
    left: false,
    bottom: false,
    right: false,
    user: null,
    search : '',
  };
          this.handleSavedHtml = this.handleSavedHtml.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.attributes = this.attributes.bind(this);
          this.drawer = this.drawer.bind(this);
          this.saveHtml = this.saveHtml.bind(this);
}

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
}
  componentWillMount = ()=>{
    let user = JSON.parse(localStorage.getItem('user'));
    this.setState({user:user});
  }

  attributes = (obj)=>{
    let string = '';
    for(let x in obj){
      string += x + '=' + '"' + obj[x] + '"' + ' ';
    }
    return string;
  }
  drawer = (arr,context) => {
    for(let i = 0; i < arr.length; i++){
      if(arr[i].type == 'tag' && arr[i].name !== "--"){
        let p = document.createElement("P");                        // Create a <p> node
        let t = document.createTextNode(`<${arr[i].name} ${this.attributes(arr[i].attrs)}> `);
        p.appendChild(t)
        context.appendChild(p);
        if(arr[i].children){
          this.drawer(arr[i].children,context.lastElementChild);
          if(!arr[i].voidElement){
            let p = document.createElement("P");
            let t = document.createTextNode(` </${arr[i].name}> `);
            p.appendChild(t);
            context.appendChild(p);
  
          }
        }else{
          return;
        }
      }else{
        if(arr[i].content){
          let p = document.createElement("P");
          let t = document.createTextNode(` ${arr[i].content}  `);
          p.appendChild(t);
        context.appendChild(p);
          }
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const context = document.getElementsByClassName('inspector-source-code')[0];
    context.innerHTML = '';
        fetch ('/fetchurl', {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
              'Authorization' : this.state.user.token,
            },
            body : JSON.stringify({url: this.state.search})
        })
        .then (res => res.json())
        .then((get)=>{this.drawer(get, context)})
        .catch(err => console.log("err", err));
}

  handleSavedHtml(event) {
    const context = document.getElementsByClassName('inspector-source-code')[0];
    event.preventDefault();
    fetch('/getSavedHtml',{
      method: 'POST',
      headers:{
        'Authorization': this.state.user.token,
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({url: this.state.search})
    })
    .then((res)=>{
      console.log(res);
      return res.json();
    })
    .then((get)=>{this.drawer(get,context)})
    .catch(e => {console.log(e)});
  }
  
  saveHtml(event){
    event.preventDefault();
    fetch('/savehtml',{
      headers:{
        'Authorization': this.state.user.token,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({url: this.state.search})
    })
    .then((res)=>{console.log(res)})
    .catch(e => {console.log(e)});
  }

  render() {
console.log(this.state.search)
    if(!this.state.user){
      return(
        <Redirect exact to="/" />
      )
    }else

    return (
      <div>
        <Header />

        <div className='home-page'>
          <LeftContent user={this.state.user}/>
          <Body urlFetch={this.handleSubmit} change={this.handleChange} value={this.state.search} getSavedHtml={this.handleSavedHtml} saveHtml={this.saveHtml}/>
        </div>
      </div>
    );
  }
}

export default (HomePage);
