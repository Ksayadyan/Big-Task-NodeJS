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
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';





const styles = {
  root: {
    flexGrow: 1
  },
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
  state = {
    auth: true,
    anchorEl: null,
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

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

  render() {
    const sideList = (
      <div>
        <List style = {styles.list}>Profile</List>
        <Divider />
        <List style = {styles.list}>My Account</List>
        <Divider/>
        <List style = {styles.list}>Search History</List>
      </div>
    );
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

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
                          >
                            {sideList}
                          </div>
                      </Drawer>      
                  </div>

                  <div className= 'search'>
                      <Input
                        placeholder="Search…"
                        disableUnderline
                        style = {styles.Search} />
                            <button className = 'search-button'><SearchIcon/></button>
                  </div>
                    
              </Toolbar>
         
          </AppBar>
                   <div className = 'left-content'>
                      <div className = 'profile-picture'>
                          <img src = 'http://archbreastcancer.com/public/site/images/admin/img_avatar.png'/>
                          <span className = 'user-name'>
                          Name : Davit <br/>
                          Surname : Sargsyan <br/>
                          Phone : 041-777-955 <br/>
                          </span>

                      </div>
                  </div>    
        <div className = 'home-page-body'>
            <h2 className = 'url-header'>URL search results </h2>
            <div className = 'search-results'>
                  <div className = 'source-code'>

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