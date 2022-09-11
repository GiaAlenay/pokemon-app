import React from "react";
import{Link} from 'react-router-dom'
export const Card=(props)=>{
    return(
      <Link to={`/pokemons/${props.id}`}>
          <div key={props.id}>
            <img src={props.front_default} alt={props.name}/>
            <h3>{props.name} </h3>
            {props.types?.map((t)=>(
              <div>{t.name}</div>
              ))}  
          </div>
      </Link>
    )
}