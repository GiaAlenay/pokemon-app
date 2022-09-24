import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import{Link} from 'react-router-dom'
import { clear, memoryAction} from "../../redux/actions";
import'./Card.css'
import { Loading } from "../loading/loading";

export const Card=(props)=>{
  const memory=useSelector(state=>state.memory)
  const [width, setWidth]=useState(0) 
  const dispatch=useDispatch()
  let backgroundimg=''

    useEffect(()=>{
      
      console.log('card component mount')
      return()=>{
        console.log('card anmount')
      }
    },[])
    //console.log('memory '+memory)
    
    
    useEffect(()=>{
    if(memory===true) { 
      setWidth(100)
    }  
    },[memory])
    
    const onClickHandler=()=>{
      props.resetCard('',false,false)      
      setWidth(0)      
      dispatch(clear('pokemonCard'))
    }
    //console.log(props.cardOnSearch)
    //console.log(width)
    const back=(type)=>{
    switch (type) {
      case 'normal':
        return backgroundimg='normalFrame.png'
      case 'fighting':
        return backgroundimg='fightingFrame.png'
      case 'flying':
        return backgroundimg='fliyingFrame.png'
      case 'poison':
        return backgroundimg='poisonFrame.png'
      case 'ground':
        return backgroundimg='groundFrame.png'
      case 'rock':
        return backgroundimg='rockFrame.png'
      case 'bug':
        return backgroundimg='bugFrame.png'
      case 'ghost':
        return backgroundimg='ghostFrame.png'
      case 'steel':
        return backgroundimg='steelFrame.png'
      case 'fire':
        return backgroundimg='fireFrame.png'
      case 'water':
        return backgroundimg='waterFrame.png'
      case 'grass':
        return  backgroundimg='grassFrame.png'
       case 'electric':
        return backgroundimg='electricFrame.png'
      case 'psychic':
        return backgroundimg='psychicFrame.png'
      case 'ice':
        return backgroundimg='iceFrame.png'
      case 'dragon':
        return backgroundimg='iceFrame.png'
      case 'dark':
        return backgroundimg='darkFrame.png'
      case 'fairy':
        return backgroundimg='fairyFrame.png'
      case 'unknown':
        return backgroundimg='unKnwonFrame.png'
      case 'shadow':
        return backgroundimg='shadowFrame.png'   
      default:
        return backgroundimg='defaultFrame.png';
    }}
    

    return(
      <div id={ props.cardOnSearch ?'cardonSearch':'cardGroup'} 
                className='general'
                style={{width:`${props.cardOnSearch && width}%`,
                backgroundImage:`url(${props.types!==undefined && 'https://i.pinimg.com/originals/29/8f/2c/298f2ce6dead72fe992253c5ba0eba95.gif'})`
              }} 
                >
        { props.cardOnSearch && (
                <div>
                    <button className="closeBtn" onClick={()=>onClickHandler()}>X</button>
                    {props.id===undefined && props.error===undefined&&(
                      <div>                        
                        <Loading typeLoader={3} pokeLoaderName={props.pokemonLoaderName}/>
                      </div>) }
                </div>
              )}
        {props.error && (
        <div>
          <img src='error.gif' alt='Error'/>
          <h3 className="error">{props.error.toUpperCase()}</h3>
          </div>)}
          
          {props.types!==undefined &&(
        <div className="card"  style={{
        backgroundImage: `url( ${props.types!==undefined && back(props.types[0].name)})`,
        backgroundSize:'250px 410px'}} 
         >
            <div className="front" id={`i${props.id}`} key={props.id}> 

                <div className="title">
                    <img className="titleContainer" src='title.png' alt=' '/>
                    <div className="poketitlecontainer">
                    <span className="pokeName">{props.name&&props.name.toUpperCase()}</span> 
                </div>
                    
                </div>
                <Link to={`/pokemons/${props.id}`}>
                  <div className="imgCont">
                    <img src={props.front_default} alt={props.name} className='mainimg'/>
                  </div>
                </Link>
                <div className="typesContainer">
                    <img src='description.png' alt='description container' className="description" />
                    <div className="typesPoke">
                        {props.types?.map((t,i)=>(
                          <div className="type" key={i}>.{t.name}</div>
                          ))} 
                    </div>
                     
                </div>
                
                
            </div>
           
        </div>)}
        
        
      </div>
    )

}
