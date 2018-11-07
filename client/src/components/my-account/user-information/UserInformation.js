import React from 'react';
import './userInformation.css';

const UserInformation = (props) => {
    const {profileImage, name, lastname, handleImage, handleSubmit}=props;
    return(
        <div className="user-information">
            <h2>User Account</h2>
            <img src={profileImage}/>
            <span>{name} {lastname}</span>
            <div>
                <label for="file"><img src="upload.png"/></label>
                <input id="file" type="file" name="image" onChange={handleImage}/>
                <button className="upload-button" onClick={handleSubmit}>Upload Image</button>

            </div>
        </div>
    )
};
export default UserInformation;