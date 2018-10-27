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
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.attributes = this.attributes.bind(this);
          this.drawer = this.drawer.bind(this);
          this.redir = this.redir.bind(this);
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
    let user
     = JSON.parse(localStorage.getItem('user'));
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
        fetch ('/fetchurl', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({url: this.state.search})
        })
        .then (res => res.json())
        .then((get)=>{this.drawer(get, context)})
        .catch(err => console.log("err", err));
}
  
  handleLogOut = () => {
    localStorage.clear();
    this.props.history.push('/sign-in');
  }
  redir = (url) => {
    this.props.history.push(url)
  }

  moveToAbout = () => {
    this.props.history.push('/about')
  }

  moveToMyAccount = ()=>{
    this.props.history.push('/my_account')
  }
  moveToContact = ()=>{
    this.props.history.push('/contact')
  }
  moveToSearchHistory = ()=>{
    this.props.history.push('/search_history')
  }

  render() {

    if(!this.state.user){
      console.log('gagaga');
      return(
        <Redirect exact to="/" />
      )
    }else

    return (
      <div>
        <Header 
          logOut={this.handleLogOut}
          myAccount={this.moveToMyAccount}
          contact={this.moveToContact}
          about={this.moveToAbout}
          history={this.moveToSearchHistory}
          urlFetch={this.handleSubmit}
          onChange={this.handleChange}
          />
        <LeftContent user={this.state.user}/>
        <Body/>
      </div>
    );
  }
}

export default (HomePage);
