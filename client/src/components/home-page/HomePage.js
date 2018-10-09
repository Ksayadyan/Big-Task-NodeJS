import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom'
import './homePage.css';

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  AppBar :{
    backgroundColor : 'grey',
    opacity : '0.9',
    height : '10vh'
  },
  Search : {
    backgroundColor : '#BBC9C7',
    width: '244px',
    height: '42px',
    lineHeight: '42px',
    padding: '0 16px',
    border: 0,
    float : 'left',

  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};
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


}

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
}

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

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
  drawer = (arr,context)=>{
    for(let i = 0; i < arr.length; i++){
      if(arr[i].type == 'tag' && arr[i].name !== "--"){
        let p = document.createElement("P");                        // Create a <p> node
        let t = document.createTextNode(`   <${arr[i].name} ${this.attributes(arr[i].attrs)}> `);
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
        fetch ('/fetchurl', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({url: this.state.search})
        })
        .then (res => res.json())
        .then((get)=>{this.drawer(get,document.getElementsByClassName('inspector-source-code')[0])})
        .catch(err => console.log("err", err));
}
  
  handleLogOut = () => {
    localStorage.clear();
    this.props.history.push('/sign-in');
  }

  render() {
    const sideList = (
      <div className = 'list-container'>
        <List style = {styles.list}>
          <Button color="secondary">
              My Account
          </Button>
        </List>  
        <Divider />
        <List style = {styles.list}>
          <Button color="secondary">
              My Account
          </Button>
        </List>
        <Divider/>
        <List style = {styles.list}>
          <Button color="secondary">
              Search History
          </Button>
        </List>
        <List style = {styles.list} >  
          <Button
            color="secondary"
            onClick = {this.handleLogOut}>
                          Sign Out
          </Button>
        </List>
      </div>
    );
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    if(!this.state.user){
      console.log('gagaga');
      return(
        <Redirect exact to="/" />
      )
    }else

    return (
      <div>
          <AppBar position="static" style = {styles.AppBar}>
              <Toolbar>

                  <div className = 'user-info'>


                      <IconButton
                          aria-owns={open ? 'menu-appbar' : null}
                          aria-haspopup="true"
                          // onClick={this.handleMenu}
                          onClick={this.toggleDrawer('left', true)}
                          color="inherit">
                              <Avatar alt="Remy Sharp" src = 'http://archbreastcancer.com/public/site/images/admin/img_avatar.png' />
                      </IconButton>


                      <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                          <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('left', false)}
                            onKeyDown={this.toggleDrawer('left', false)}
                            className = 'sidelist'
                          >
                            {sideList}
                          </div>
                      </Drawer>
                  </div>

                  <div className= 'search'>
                      <TextField
                        type = 'text'
                        name = 'search'
                        placeholder="Search…"
                        disableUnderline
                        className={classes.input}
                        value = {this.state.search} 
                        onChange = {this.handleChange}/>
                            <Button 
                              className = 'search-button'>
                                <SearchIcon
                                  onClick = {this.handleSubmit}/>
                            </Button>
                  </div>
              </Toolbar>

          </AppBar>
                   <div className = 'left-content'>
                      <div className = 'profile-picture'>
                          <img src = {this.state.user.profileImage}/>
                          <span className = 'user-name'>
                          Name : {this.state.user.name} <br/>
                          Surname : {this.state.user.lastname} <br/>
                          Total Fetched : {this.state.user.totalFetched} <br/>
                          Total Images : {this.state.user.totalImages} <br/>
                          </span>

                      </div>
                  </div>
        <div className = 'home-page-body'>
            <h2 className = 'url-header'>URL search results </h2>
            <div className = 'search-results'>
                  <div className = 'source-code'>
                  {this.serverRes}
                  </div>
                  <div className = 'inspector-source-code'>

                  </div>
            </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
