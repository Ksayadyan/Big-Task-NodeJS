import React from 'react';
import './userInformation.css';

const UserInformation = (props) => {
    const {profileImage, name, lastname, handleImage, handleSubmit, token}=props;
    return(
        <div className="user-information">
            <h2>User Account</h2>
            
            <label for="profile-image" className="Images-uploade"><img src={`http://localhost:3000/${profileImage}?token=${token}`}/></label>
            <input id="profile-image" type="file" name="image" onChange={handleImage} />
            <button className="upload-button" onClick={handleSubmit}>Upload Image</button>

            <span>{name} {lastname}</span>
           
        </div>
    )
};
export default UserInformation;