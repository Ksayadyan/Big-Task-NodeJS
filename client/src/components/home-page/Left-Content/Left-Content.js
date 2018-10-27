import React from 'react';
import './leftContent.css';

const LeftContent = (props) => {
    return(
        <div className="left-content">
           <div className="profile-picture">
               <img src={props.user.profileImage}/>
           </div>
           <div className="user-name">
                <span>
                    Name : {props.user.name} <br/>
                    Surname : {props.user.lastname} <br/>
                    Total Fetched : {props.user.totalFetched} <br/>
                    Total Images : {props.user.totalImages} <br/>
                </span>
            </div>
        </div>

    )
}
export default LeftContent;