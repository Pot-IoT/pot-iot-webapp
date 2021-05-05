import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { GiCookingPot } from 'react-icons/gi';

function Footer() {
    return (
        <div className='footer-container'>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            <GiCookingPot class="navbar-icon" /> PoT-IoT
                        </Link>
                    </div>
                    <small className='website-rights'>Email: support@pot-iot.com</small>
                </div>
            </section>
        </div>
    );
}

export default Footer;