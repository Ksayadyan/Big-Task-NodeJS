import React from 'react';
import Button from '@material-ui/core/Button';
import './myAccount.css'

class MyAccount extends React.Component{
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(){
    this.props.history.push('/Home_page');
  }
  render() {
    return (
      <div>
          <div className = 'left-content'>
                <div className = 'profile-picture'>
                    <img/>
                </div>
                <div className = 'user-name'>
                    Name :  <br/>
                    Surname :  <br/>
                    Total Fetched : <br/>
                    Total Images :  <br/>
                </div>
                <div className = 'backHomepage' >
            <Button 
            color = 'secondary'
            onClick = {this.handleClick}
            >
                Back to Home page
            </Button>
        </div>
                  
        </div>

      </div>
    );
  }
};



export default MyAccount
