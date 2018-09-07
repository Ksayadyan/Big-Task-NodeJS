import React from 'react';
import './Header.css';
import Inputlogin from '../Inputs/Inputlogin';
import Inputpassword from '../Inputs/Inputpassword';
import Signinbutton from '../Signinbutton/Signinbutton';

function Header(){
  return(
    <header>
      <p id="Headertext">DataOwl Tools</p>
      <Inputlogin />
      <Inputpassword />
      <Signinbutton />
    </header>
  )
}

export default Header;
