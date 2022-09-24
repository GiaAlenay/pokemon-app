import React from "react";
import { Card } from "../Card/Card";
import './Cards.css'
export const Cards=(props)=>{
    
    return(
        <div >
            <ul className="cards">
                {props.allPokemons?.map((p)=>(
                    <div className="card" key ={p.id}>
                        <li>
                            <Card name={p.name}
                                    id={p.id}
                                    front_default={p.front_default}
                                    types={p.types} />
                        </li>

                    </div>))}
            </ul>
        </div>
    )
}