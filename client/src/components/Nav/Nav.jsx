import React from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

export const Nav=()=>{
    return (
        <div className='navBar'>
            <ul>
            <Link to="/home">
                <li>HOME</li>
            </Link>

            <Link to="/">
                <li>LANDING</li>
            </Link>     

            <Link to ="/create">
                <li>CREA TU POKEMON</li>
            </Link>

            <Link to ="/about">
                <li>ABOUT</li>
            </Link>
            </ul>
            <hr/>
        </div>
        
    )
}