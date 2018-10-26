import React from 'react';
import TextField from '@material-ui/core/TextField';

function Input (type , label, variant, name,  onKeyDown, value , onChange){
    return (
        <div className='form-field'>
            <TextField 
                type = {type}
                label = {label}
                variant = {variant}
                name = {name}
                onKeyDown = {onKeyDown}
                value = {value}
                onChange = {onChange}
                required
                />
        </div>
    )

}
export default Input;
 