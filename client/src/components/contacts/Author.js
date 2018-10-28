import React from 'react';

const Li = (props) => {
    return(
        <li>
            
            <h2>{props.name}</h2><br/>
            <img src={props.img} alt="author-image"/><br/>
            {props.email}<br/>
            {props.phone}
        </li>
    )
}
export default Li;