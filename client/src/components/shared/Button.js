//react main imports
import React from 'react';

// Material-Ui components
import Button from '@material-ui/core/Button';

function Btn (props){
    return  <Button 
                disabled= {props.disabled}
                variant="outlined"
                color="secondary"
                onClick={props.event}>
                {props.name}  
            </Button>
}
export default Btn;