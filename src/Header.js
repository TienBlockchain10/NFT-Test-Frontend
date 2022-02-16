import React from 'react'
import './Header.css'


function Header() {
    return (
        <div className='header'>
            <ul className='header-list'>
                <li><h2><a href='/'>Home</a></h2></li>
                <li><h2><a href='/'>Road Map</a></h2></li>
                <li><h2><a href='/'>About</a></h2></li>
            </ul>
        </div>
    )
}

export default Header