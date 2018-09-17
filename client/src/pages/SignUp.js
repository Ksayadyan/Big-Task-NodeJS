import React from 'react';

class SignUp extends React.Component {
    constructor(){
        super();
        this.state = {
            lastName : '',
            login : '', 
            firstName : '',
            password : '',
            gender : '',
            birthday : '',
            email : '',
            telephone : '',
            question : '',
            answer : '',
          
            agree : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    

    handleSubmit(event) {
        const sendObj = this.state;
        event.preventDefault();
        // send.lastName
        console.log('The form was submitted with the following data:');
        console.log(this.state);

            fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(sendObj)
        })
        .then(res => res.json())
        .then(get => console.log(get))
        .catch(err => console.log("err", err));
        
    }


    render(){
        return(
            <div className = 'form-container'>
            <form onSubmit = {this.handleSubmit} className = 'form'>
              <div className = 'form-field'>
                  <label className = 'form-field-label' >Last Name:</label>
                  <br/>
                  <input  type ='text' placeholder = 'Enter your Last Name...' className = 'form-field-input' value ={this.state.lastName} onChange = {this.handleChange} name = 'lastName'  />
              </div>
              <div className = 'form-field'>
                  <label className = 'form-field-label' >First Name:</label>
                  <br/>
                  <input  type ='text' placeholder = 'Enter your First Name...' className = 'form-field-input' value ={this.state.firstName} onChange = {this.handleChange} name = 'firstName' />
              </div>
              
              <div className = 'form-field'>
                  <label className = 'form-field-label'>Login:</label>
                  <br/>
                  <input type = 'text' placeholder = 'Enter your Login...' className = 'form-field-input' value ={this.state.login} onChange = {this.handleChange} name = 'login'/>
              </div>
          
              <div className = 'form-field'>
                  <label className = 'form-field-label'>Password:</label>
                  <br/>
                  <input type = 'password' placeholder = 'Enter your password...' className = 'form-field-input' value ={this.state.password} onChange = {this.handleChange} name = 'password'/>
              </div>
              <div className = 'form-field-radio'>
                   <input  type="radio" className = 'form-field-rad' name="gender" value= 'male' onChange = {this.handleChange} checked={this.state.gender === 'male'}  /> Male
                   <input type="radio" className = 'form-field-rad' name="gender" value= 'female' onChange = {this.handleChange} checked={this.state.gender === 'female'}  /> Female
              </div>
              <div className = 'form-field'>
                  <label className = 'form-field-label'>Birthday:</label>
                  <br/>
                  <input type = 'date'  className = 'form-field-input' value ={this.state.birthday} onChange = {this.handleChange} name = 'birthday'/>
              </div>
              
              <div className = 'form-field'>
                  <label className = 'form-field-label'>E-Mail:</label>
                  <br/>
                  <input type = 'email' placeholder = 'Enter your E-Mail...' className = 'form-field-input' value ={this.state.email} onChange = {this.handleChange} name = 'email'/>
              </div>
              <div className = 'form-field'>
                  <label className = 'form-field-label'>Telephone:</label>
                  <br/>
                  <input type = 'tel' placeholder = 'Enter your telephone...' className = 'form-field-input' value ={this.state.telephonel} onChange = {this.handleChange} name = 'telephone'/>
              </div>
              <div className = 'form-field'>
                  <label className = 'form-field-label' >Question:</label>
                  <br/>
                  <input  type ='text' placeholder = 'Enter your Question...' className = 'form-field-input' value ={this.state.question} onChange = {this.handleChange} name = 'question' />
              </div>
              <div className = 'form-field'>
                  <label className = 'form-field-label' >Answer:</label>
                  <br/>
                  <input  type ='text' placeholder = 'Enter your answer...' className = 'form-field-input' value ={this.state.answer} onChange = {this.handleChange} name = 'answer' />
              </div>
            
              <div className = 'form-field'>
                  <label className = 'form-checkbox-label'>Do you agree with terms ?</label>
                  <input type = 'checkbox' className = 'form-field-checkbox' value ={this.state.agree} onChange = {this.handleChange} name = 'agree'/>
              </div>
              <div className = 'form-field' >
                  <button className = 'form-field-button' >Sign Up</button>
              </div>
              
            </form>

        </div>
        )
    }

}

export default SignUp