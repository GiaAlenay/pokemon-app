import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

export const Nav=()=>{
    // const [show,setShow]=useState(true)
    // const [lastScrollY, setLastScrollY] = useState(0);
    // const controlNavbar=()=>{
    //     if (typeof window !== 'undefined') { 
    //         if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
    //           setShow(false); 
    //         } else { // if scroll up show the navbar
    //           setShow(true);  
    //         }
      
    //         // remember current page location to use in the next move
    //         setLastScrollY(window.scrollY); 
    //       }
    // }
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //       window.addEventListener('scroll', controlNavbar);
    
    //       // cleanup function
    //       return () => {
    //         window.removeEventListener('scroll', controlNavbar);
    //       };
    //     }
    //   }, [lastScrollY]);
    
    //console.log(position)
    // window.onscroll = function() {
    // var currentScrollPos = window.pageYOffset;
    // if (prevScrollpos > currentScrollPos) {
    //     document.getElementsByClassName("navBar").style.top = "0";
    // } else {
    //     document.getElementsByClassName("navBar").style.top = "-50px";
    // }
    // prevScrollpos = currentScrollPos;
    // }
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
                <li>CREATE POKEMON</li>
            </Link>

            <Link to ="/about">
                <li>ABOUT</li>
            </Link>
            </ul>
            <hr/>
        </div>
        
    )
}