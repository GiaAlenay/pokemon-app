import React from "react";
import { getPokemonByID ,clear } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Nav } from "../Nav/Nav";
import { Loading } from "../loading/loading";
import './PokemonDetail.css'
import {back} from'./PokemonDetailBackground.js'

export const PokemonDetail=(props)=>{
  //console.log(props.match.params.id)
  const [code,setCode]=useState('')
  let pokemonDetail= useSelector(states=> states.pokemonDetail)
  const dispatch=useDispatch()
//unmount mount update global
  useEffect(()=>{
    dispatch(getPokemonByID(props.match.params.id))    
    
    return (()=>{
      dispatch(clear('pokemonDetail'))
    })
  },[dispatch,props.match.params.id])
//update locales
  useEffect(()=>{
    if(pokemonDetail!==undefined && pokemonDetail.types &&pokemonDetail.types[0]){
      back(pokemonDetail.types[0].name)
    }
    idHandler()
    upperNameHandler()
  },[pokemonDetail] )

  const idHandler=()=>{
    if(pokemonDetail && pokemonDetail.id>100){
      setCode('#'+pokemonDetail.id)
    }
    if(pokemonDetail && pokemonDetail.id<10){
      setCode('#00'+pokemonDetail.id)      
    }
    if(pokemonDetail && pokemonDetail.id>9){
      setCode('#0'+pokemonDetail.id)      
    }   
  }

  const upperNameHandler=(i,type)=>{
  if(pokemonDetail && pokemonDetail.types!==undefined && pokemonDetail.types[i]){
    return type.charAt(0).toUpperCase()+type.slice(1).toLocaleLowerCase()
    //return type.toUpperCase()
  }  
  }
  
  //pokemonDetail?console.log(pokemonDetail):console.log('no')
    return(
      <div className="pokeDetail" 
           style={{backgroundImage: `url( ${pokemonDetail.id!==undefined?back(pokemonDetail.types[0].name):'https://i.pinimg.com/originals/ba/7d/3e/ba7d3ee8577d9e486e644f83ce4451f0.jpg'})`}} >
        <div className="NavDetailPokemon"><Nav/></div>
        {Object.entries(pokemonDetail).length === 0?(
          <div className="loaderCont">
          <Loading typeLoader={2}/>
          </div>
          
        ):(<div >
            <div className="pokeNameDetail">
              <h1>{pokemonDetail.name} {code}</h1> 
            </div>
            
            <div className="gridContainer">
            
            <img className="pokePic" src={pokemonDetail.front_default} alt={pokemonDetail.name}/>

            <fieldset className="pokeDetailTypes">
              <legend>TYPES:</legend>
              {pokemonDetail.types.map((t,i)=>(
                <div key={i}>
                  .{upperNameHandler(i,t.name)}
                </div>
              ))}
            </fieldset> 

            <fieldset className="pokeDetailHeightWeigth">
              <h5>HEIGHT: {pokemonDetail.height}</h5>
              <h5>WEIGHT: {pokemonDetail.weight}</h5>
            </fieldset>       
                
              <fieldset className="statistics-container">
                <legend >STATISTICS:</legend>
                  <div>
                          <div className="statisticProgrese"></div>
                          <span>HP   </span>
                          <div className='progress'>
                            <div className="progress-Done" style={{width:`${pokemonDetail.hp*3}px`}}>
                              {pokemonDetail.hp}
                            </div>
                          </div>
                    

                          <div className="statisticProgrese"></div>
                          <span>ATTACK </span>
                          <div className='progress'>
                            <div className="progress-Done" style={{width:`${pokemonDetail.attack*3}px`}}>
                              {pokemonDetail.attack}
                            </div>
                          </div>
                  
                          <div className="statisticProgrese">
                            <span>SPEED </span>
                            <div className='progress'>
                              <div className="progress-Done" style={{width:`${pokemonDetail.speed*3}px`}}>
                                {pokemonDetail.speed}
                              </div>
                            </div>
                          </div>

                          <div className="statisticProgrese">
                            <span>DEFENSE </span>
                            <div className='progress'>
                              <div className="progress-Done" style={{width:`${pokemonDetail.defense*3}px`}}>
                                {pokemonDetail.defense}
                              </div>
                            </div>              
                          </div>
                
                  </div>
              </fieldset>
              </div>
        </div>)}
        
      </div>
    )
}