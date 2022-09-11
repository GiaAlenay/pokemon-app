import React from "react";
import { Card } from "../Card/Card";

export const Cards=(props)=>{
    
    return(
        <div>
            <ul>
                {props.allPokemons?.map((p)=>(
                    <div key ={p.id}>
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