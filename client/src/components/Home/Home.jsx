import React, { useEffect } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Loading } from "../loading/loading";
import { Pagination } from "../Pagination/Pagination";
import { getAllPokemons , getTypes} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {Nav} from '../Nav/Nav'
import { useState } from "react";
import { Filter } from "../Filter/Filter";
import './Home.css'


export const Home=()=>{
    
    const allPokemons=useSelector(state=>state.allPokemons)
    const allTypes=useSelector(state=> state.allTypes) 
    const dispatch=useDispatch()
  

    useEffect(() => {                      
         dispatch( getAllPokemons())                 
        dispatch(getTypes())
    },[])
    
    
    //allTypes?console.log(allTypes):console.log('no')
    //poke?console.log(poke):console.log('no poke')   
    //confirm?console.log('si'):console.log('no')   
    return(
        <div className="home"> 
            {allPokemons && allPokemons.length===0 ?(
                <div className="loaderCont">
                    <Loading typeLoader={1}/>
                </div>):
                (<div> 
                    <Nav/>
                    <SearchBar allPokemons={allPokemons}/>
                    <div className="filter"><Filter allTypes={allTypes}/></div>
                    {allPokemons && allPokemons[0].error?(
                        <div className="cardsError">
                            {allPokemons[0].error}
                        </div>):(
                            <div>
                                <Pagination allPokemons={allPokemons}/>
                        
                            </div>
                            
                        )}                      
                    
                    

                </div>)
            }
                        
        </div>
    )
}