import React from "react";
import {Link} from 'react-router-dom'
import './Landing.css'
export const Landing=()=>{
    return(
        <div id='SLIDE_BG'>
            
            <Link to="/home">
                
                    <img id='logo'src={'logo.png'} alt='logo'/>
               
                
            </Link>
        </div>

    
    )
}