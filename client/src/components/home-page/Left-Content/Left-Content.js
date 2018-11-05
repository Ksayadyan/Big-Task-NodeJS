import React from 'react';
// CSS 
import './leftContent.css';

// Left content renders left side of Home page which contains user's information
const LeftContent = (props) => {
    const {profileImage, name, lastname, totalFetched, totalImages} = props.user;
    return(
        <div className="left-content">
           <div className="profile-picture">
               <img src={profileImage}/>
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