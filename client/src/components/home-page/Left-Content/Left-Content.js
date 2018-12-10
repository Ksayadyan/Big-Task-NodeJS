import React from 'react';
// CSS 
import './leftContent.css';

// Left content renders left side of Home page which contains user's information
const LeftContent = (props) => {
    const {profileImage, name, lastname, totalFetched, totalImages, token} = props.user;
    return(
        <div className="left-content">
           <div className="profile-picture">
               <img src={`http://localhost:5000/${profileImage}?token=${JSON.parse(localStorage.user).token}`}/>
           </div>
           <div className="user-name">
                <span>
                    Name : {name} <br/>
                    Surname : {lastname} <br/>
                    Total Fetched : {totalFetched} <br/>
                    Total Images : {totalImages} <br/>
                </span>
            </div>
        </div>

    )
}
export default LeftContent;