// React main imports
import React from 'react';
import {Redirect} from 'react-router-dom';
// Home page content components
import Header from './Header/Header';
import LeftContent from './Left-Content/Left-Content';
import Body from './Body/Body';
import WebService from '../../services/WebService';
// CSS
import './homePage.css';

// HomePage components includes all neccessary functions and components for rendering HomePage 
class HomePage extends React.Component {
  constructor(){
    super();
  this.state = {
    auth: true,
    top: false,
    left: false,
    bottom: false,
    right: false,
    user: null,
    search : '',
    loading : false,
  };
    //binding all functions that containt this
          this.handleSavedHtml = this.handleSavedHtml.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.attributes = this.attributes.bind(this);
          this.drawer = this.drawer.bind(this);
          this.saveHtml = this.saveHtml.bind(this);
}
// handleChange takes value from the target and sets with the appropriate key to state
  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
}
// gets user information from the localStorage and sets to the state 
  componentWillMount = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    this.setState({user:user});
  }
// function for drawing argumnents of html tags 
// obj argument is an object which contains tag name and arguments list
  attributes = (obj) => {
    let string = '' ;
    for(let x in obj){
      string += x + '=' + '"' + obj[x] + '"' + ' ';
    }
    return string;
  }

  // function for drawing html source code 
  // arr argument is responce from the request , which is array with tags list 
  // context is the place where source code is going to draw 
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
  // making request to server and getting array(which contains objects with tags) as a responce 
  handleSubmit(event) {
    event.preventDefault();
    // setting loading to true for loading icon popup
    this.setState({
      loading : true
    })
    const context = document.getElementsByClassName("inspector-source-code")[0];
    context.innerHTML = "";
    const body = {url : this.state.search};
    const token = this.state.user.token;
    WebService.request('/fetchurl', 'POST', body, token)
        .then(
          (get)=>{this.drawer(get, context);
          this.setState({
            loading: false,
          })
          console.log(get)
        })
        .catch(err => console.log("err", err));
}
// getting saved HTML from the server 
  handleSavedHtml(event) {
    const context = document.getElementsByClassName('inspector-source-code')[0];
    event.preventDefault();
    const body = {url : this.state.search};
    const token = this.state.user.token;
    WebService.request('/getSavedHtml', 'POST', body, token)
    .then((get)=>{this.drawer(get,context)})
    .catch(e => {console.log(e)});
  }
  // Saving HTML in database
  saveHtml(event){
    event.preventDefault();
    const body = {url : this.state.search};
    const token = this.state.user.token;
    WebService.request('/savehtml', 'POST', body, token)
    .then((res)=>{console.log(res)})
    .catch(e => {console.log(e)});
  }

  render() {
    const {user, loading, search} = this.state;
    if(!this.state.user){
      return(
        <Redirect exact to="/" />
      )
    }else

    return (
      <div>
        <Header />
        <div className="home-page">
          <LeftContent user={user}/>
          <Body 
              urlFetch={this.handleSubmit} 
              change={this.handleChange} 
              value={search} 
              getSavedHtml={this.handleSavedHtml} 
              saveHtml={this.saveHtml}
              loading = {loading}/>
        </div>

        <div className="inspector">

        <button onClick={this.showInspector}>Show inspector code</button>

        
        </div>
      </div>
    );
  }
}

export default (HomePage);
