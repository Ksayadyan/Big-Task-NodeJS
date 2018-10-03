
let validate = ()=>{
    let errors = {};
    let phoneNumber = Number(this.state.phone);

        if(this.state.lastName.length < 3 || /[0-9]/.test(this.state.lastName)){
        errors.lastNameError = 'Last Name must be at least 3 character long and does not contain numbers';
            } else{
                errors.lastNameError = '';
            } 
        if(this.state.firstName.length < 3|| /[0-9]/.test(this.state.firstName)){
            errors.firstNameError = 'First Name must be at least 3 character long and does not contain numbers';
            } else{
                errors.firstNameError = '';
            }   
        if(this.state.login.length < 5){
            errors.loginError = 'login must be at least 5 charecter long'
            } else{
                errors.loginError = '';
            } 
        if(!this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
            errors.passwordError = 'Password must be at least 6 characters long and contain at least one numeric digit, one uppercase and one lowercase letter';
            } else{
                errors.passwordError = '';
            } 
        if(!this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                errors.emailError = 'Please enter correct email address';
            } else{
                errors.emailError = '';
            } 
        if(isNaN(phoneNumber)){
                errors.phoneError = 'Phone must contain only digits';
            }else{
                errors.phoneError = '';
            } 

    if (Object.keys(errors).length){
        this.setState({
           ...this.state.errors, 
           ...errors
        });
    } 
 
    return Object.keys(errors).length
}

export default validate;