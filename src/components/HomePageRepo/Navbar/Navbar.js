import React, { useState, useEffect } from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { GiCookingPot } from 'react-icons/gi';


function Navbar() {
    const [clicked, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => { setClick(!clicked) };

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    window.addEventListener('resize', showButton);

    useEffect(() => {
        showButton();
    }, [])

    return (
        <nav className='NavbarItems'>
            <Link className='navbar-logo' to='/'>
                <GiCookingPot class="navbar-icon" /> PoT-IoT
            </Link>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}> {item.title} </a>
                        </li>
                    )
                })}
            </ul>
            <div className='button-section'>
                <Link to='/'>{button && <Button buttonStyle='btn--outline' buttonSize='btn--medium' buttonColor='gray'>Log In</Button>}</Link>
                <Link to='/'>{button && <Button buttonStyle='btn--primary' buttonSize='btn--medium--free' buttonColor='primary'>Try for free</Button>}</Link>
            </div>
            <div className='menu-icon' onClick={handleClick}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
        </nav>
    )
}

export default Navbar
