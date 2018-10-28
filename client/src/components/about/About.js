import React from 'react' ; 
import Header from '../home-page/Header/Header';
import './about.css'
const About = () => {
    return(
        <div>
            <Header/>
            <div className="about-content">
            <h2>Mihat teqst mtaceq vor stex grenq )))</h2>
                 <p>
                 Hi Dear user 
                 Here we will talk a little bit about our website and will explain you how to use it
                 First of all our web site is intended for users who want to follow all HTML changes in correct view,for all websites.
                 To get HTML code of website you just need to write correct URL in search bar,for example https://www.dataowl.io/
                 Then you can see last and correct version of HTML structure,and save in DataBase.
                 But it's not the only feature you can enjoy.Users can upload and save images,so our website can be something lika a google drive for you.
                </p>
            </div>
        </div>
    )
}
export default About;