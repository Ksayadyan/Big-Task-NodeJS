// React main imports
import React from 'react';
// Content components
import Header from '../home-page/Header/Header';
import Author from './Author';
// CSS 
import './contacts.css';
const Contacts = () => {
    return(
        <div>
            <Header/>
            <div className="contact-container">
                <ul>
                    <Author
                        name="Davit Sargsyan"
                        img="n.jpg"
                        email="sargsyandavit1992@gmail.com"
                        phone="+37441777955"/>
                    <Author
                        name="Karen Sayadyan"
                        img="male.jpg"
                        email="sayadyankaren1999@gmail.com"
                        phone="+37477262662"/>
                    <Author
                        name="Vahan Hovsepyan"
                        img="male.jpg"
                        email="hovsepyanvahan1997@gmail.com"
                        phone="+37477123456"/>
                    <Author
                        name="Davit Sargsyan"
                        img="male.jpg"
                        email="sargsyandavit1999@gmail.com"
                        phone="+37493013485"/>
                </ul>
            </div>
        </div>
    )
}

export default Contacts;