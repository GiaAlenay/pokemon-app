import React, { useEffect } from "react";
import { Cards } from "../Cards/Cards";
import { SearchBar } from "../SearchBar/SearchBar";
import { getAllPokemons } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
export const Home=()=>{
    
    const allPokemons=useSelector(state=>state.allPokemons)
    const dispatch=useDispatch()
    useEffect(() => {
        
        dispatch(getAllPokemons())
        
        
     }, [])
    return(
        <div>Home
            <SearchBar allPokemons={allPokemons}/>
            <Cards allPokemons={allPokemons}/>
        </div>
    )
}