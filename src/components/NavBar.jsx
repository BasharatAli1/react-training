import React from 'react';
import airBNBLogo from '../images/air-bnb.png';

const NavBar = () => {
  return (
    <nav className='navBar'>
        <img src={airBNBLogo} alt="Logo" className='bnb-logo'/>
    </nav>
  )
}

export default NavBar