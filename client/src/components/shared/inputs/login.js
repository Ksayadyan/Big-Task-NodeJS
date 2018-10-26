import React from 'react';
import Input from '../../shared/Input';
import errMsg from '../../shared/ErrorMessages.js';
const errorner = {}
let login = null;
class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            login : '',
        }  
        this.handleChange = this.handleChange.bind(this);
        this.loginValidation = this.loginValidation.bind(this);
        this.changeState = this.changeState.bind(this); 
    };
    
loginValidation = ()=>{
        (this.state.login.length < 5) ?
            errorner.loginError = errMsg.loginError:
            errorner.loginError = '';
        this.changeState();
}; 

changeState = ()=>{
    if (Object.keys(errorner).length){
        this.setState({
           ...this.state.errors,
           ...errorner
        });
    }

    return
} 

handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    login = value;

    this.setState({
      [name]: value
    });
}
    render(){
        return(<div>
                {Input('text', 'login', 'outlined', 'login', this.loginValidation, this.state.login, this.handleChange)};
                <small className = 'error'>{this.state.loginError}</small>

             </div>
        )
    }

}

export  {Login, login};

