
//React main imports
import React from 'react';

//Material-UI component
import TextField from '@material-ui/core/TextField';


// Component input renders HTML input with the given props

const Input = (props) => {
    return (
        <div className='form-field'>
            <TextField 
                type={props.type}
                label={props.label}
                variant={props.variant}
                name={props.name}
                onKeyDown={props.onKeyDown}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                InputLabelProps={props.InputLabelProps}
                required
                />
        </div>
    )

}
export default Input;
 