import React from 'react';

// ErrorField is a component that returns HTML small tag with given 
//props

const ErrorField = (props)=>{
    return(
        <small className="error">
            {props.errorName}
        </small>
    )
}
export default ErrorField;