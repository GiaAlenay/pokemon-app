import React, { useEffect, useState } from "react";
import './SearchBar.css'

export const SearchBar=(props)=>{
    const [pokemon,setPokemon]=useState([])
    const [text,setText]=useState('')
    const [suggestions,setSuggestions]=useState([])
    //const dispatch=useDispatch()
    
    useEffect(()=>{
        setPokemon(props.allPokemons)
    },[])

    props.allPokemons?console.log(props.allPokemons):console.log('no')

    const onSuggestHandler=(text)=>{
        setText(text)
        setSuggestions([])
    }

    const onChangeHandler=(text)=>{
        let matches=[]
        if(text.length>0){
            matches=props.allPokemons.filter(poke=>{
                const regex= new RegExp(`${text}`,"gi")
                return poke.name.match(regex)
            })
        }
        console.log('matches',matches)
        setSuggestions(matches)
        setText(text)
    }

    return(
      <div className="container">
        {/*<div>{text}</div>*/}
        <input type='text' className="input" style={{marginTop:10}}
        onChange={e=>onChangeHandler(e.target.value)}
        value={text}
        onBlur={()=>{ setTimeout(()=>{setSuggestions([])},100)}}
        />
        <di className='cont'>{suggestions && suggestions.map((su,i)=>(
            <div key={i} 
            className="suggestion"
            onClick={()=>onSuggestHandler(su.name)}
            >
                {su.name}
            </div>
        
            ))}
        </di>
      </div>
    )
}