import React from 'react';
import './NavBar.css';
import reactLogo from '../assets/react.svg';

const NavBar = () => {
  return (
    <nav className='navBar'>
        <img src={reactLogo} alt="Logo"/>
        <h3 className='heading'>ReactFacts</h3>
        <h4 className='heading'>React Course - Project 01</h4>
    </nav>
  )
}

export default NavBar