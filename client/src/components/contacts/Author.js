// React main imports
import React from 'react';
// Li component returns web-site authors information , which he gets with props
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