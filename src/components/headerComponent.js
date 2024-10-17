import { useEffect, useState } from 'react';
import '../Css/header.css'


function HeaderComponent( caller) {

    return (
        <>
        <div className='bg'>
        <div className="navbarr">
                <div className="left-navv">

                    <a href="/">Home</a>
                    <a href="/Menu" style={{ color: caller.caller === 'Menu' ? 'rgba(80, 240, 52, 0.796)': ''}}>Menu</a>
                    <a href="/About-us" style={{ color: caller.caller === 'About-us' ? 'rgba(80, 240, 52, 0.796)': ''}}>About Us</a>
                    <a href="/Contact-us" style={{ color: caller.caller === 'Contact-us' ? 'rgba(80, 240, 52, 0.796)': ''}}>Contact Us</a>

                </div>
        </div>
                    <hr className='hrr'></hr>
                    </div>
        </>
    )
}
export default HeaderComponent;