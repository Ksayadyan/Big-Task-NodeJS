// React main imports
import React from 'react';
// Li component returns web-site authors information , which he gets with props
const Li = (props) => {
    const {name, img, email, phone} = props;
    return(
        <li>
            <h2>{name}</h2><br/>
            <img src={img} alt="author-image"/><br/>
            {email}<br/>
            {phone}
        </li>
    )
}
export default Li;