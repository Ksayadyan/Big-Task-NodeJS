import React from 'react';
import './notFound.css'

class NotFound extends React.Component{
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(){
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <p className="not-found"> 404 Not Found :(</p>
        <div className="go-back-to-FirstPage" onClick={this.handleClick}>Go back to Home page</div>
      </div>
    );
  }
};



export default NotFound
